from functools import reduce
import itertools

import data_format


class YuhunComb(object):
    def __init__(self, yuhun_list, l2_prop_limit, l4_prop_limit, l6_prop_limit, optimize_pane, limit_props, limit_pane, plan, shishen_pane):
        """Calculate total damage
        Args:
            yuhun_list (list): 御魂列表
            l2_prop_limit (list): 二号位主属性
            optimize_pane (str): 优化目标
            limit_props (dict): 属性限制 如： {'速度': {'min': 0, 'max': 128 } }
            limit_pane (dict): 面板限制 如： {'输出伤害': {'min': 17800, 'max': float('inf') } }
            effective_props (list): 有效属性, 计算要用到的
            plan (dict): 御魂套装方案 {'4':'狂骨', '2':'荒骷髅'}
            shishen_pane (dict): 式神面板
        """
        self.yuhun_dict = self.yuhun_list2dict(yuhun_list)
        self.l2_prop_limit = l2_prop_limit
        self.l4_prop_limit = l4_prop_limit
        self.l6_prop_limit = l6_prop_limit
        self.optimize_pane = optimize_pane
        self.limit_props = limit_props
        self.effective_props = list(set(data_format.MITAMA_PROPS_EFFECT[optimize_pane]) | set(limit_props.keys()))
        self.plan = plan
        self.shishen_pane = shishen_pane

    def yuhun_list2dict(self, yuhun_list):
        yuhun_dict = {1: [], 2: [], 3: [], 4: [], 5: [], 6: []}
        for yuhun in yuhun_list:
            yuhun = self.format_yuhun(yuhun)
            yuhun_dict[yuhun['loc']].append(yuhun)
        return yuhun_dict

    @staticmethod
    def format_yuhun(yuhun):
        new_yuhun = {}
        new_yuhun['loc'] = yuhun.pop('位置')
        new_yuhun['star'] = yuhun.pop('御魂星级')
        new_yuhun['level'] = yuhun.pop('御魂等级')
        new_yuhun['id'] = yuhun.pop('御魂ID')
        new_yuhun['name'] = yuhun.pop('御魂类型')
        new_yuhun['type'] = data_format.MITAMA_ENHANCE[new_yuhun['name']]['加成类型']
        new_yuhun['props'] = yuhun
        loc = new_yuhun['loc']
        props = new_yuhun['props']
        if loc == 1:
            new_yuhun['main_prop'] = '攻击'
        elif loc == 3:
            new_yuhun['main_prop'] = '防御'
        elif loc == 5:
            new_yuhun['main_prop'] = '生命'
        else:
            if props.get('速度', 0) >= 57:
                new_yuhun['main_prop'] = '速度'
            elif props.get('暴击', 0) >= .55:
                new_yuhun['main_prop'] = '暴击'
            elif props.get('暴击伤害', 0) >= .89:
                new_yuhun['main_prop'] = '暴击伤害'
            elif props.get('攻击加成', 0) >= .55:
                new_yuhun['main_prop'] = '攻击加成'
            elif props.get('生命加成', 0) >= .55:
                new_yuhun['main_prop'] = '生命加成'
            elif props.get('防御加成', 0) >= .55:
                new_yuhun['main_prop'] = '防御加成'
            else:
                new_yuhun['main_prop'] = '未知'
        return new_yuhun

    def filter_loc_prop(self, yuhun_list, prop_limit):
        return list(filter(lambda x: x['main_prop'] in prop_limit, yuhun_list))

    def run(self):
        # yuhun_count = reduce(lambda x, y: x*y, map(len, self.yuhun_dict.values()))
        print(list(map(len, self.yuhun_dict.values())))
        # 过滤低星及未满级御魂
        for i in range(1, 7):
            self.yuhun_dict[i] = list(filter(lambda x: x['star'] == 6 and x['level'] == 15, self.yuhun_dict[i]))
        # 过滤二四六号位的御魂
        if len(self.l2_prop_limit):
            self.yuhun_dict[2] = self.filter_loc_prop(self.yuhun_dict[2], self.l2_prop_limit)
        if len(self.l4_prop_limit):
            self.yuhun_dict[4] = self.filter_loc_prop(self.yuhun_dict[4], self.l4_prop_limit)
        if len(self.l6_prop_limit):
            self.yuhun_dict[6] = self.filter_loc_prop(self.yuhun_dict[6], self.l6_prop_limit)
        # 过滤不包含有效属性的御魂
        for i in range(1, 7):
            self.yuhun_dict[i] = list(filter(lambda x:
                                             set(x['props'].keys()) & set(self.effective_props), self.yuhun_dict[i]))
        for i in range(1, 7):
            self.yuhun_dict[i] = self.filter_lower_yuhun(self.yuhun_dict[i])
        # yuhun_count = reduce(lambda x, y: x*y, map(len, self.yuhun_dict.values()))
        print(list(map(len, self.yuhun_dict.values())))

    def get_yuhun_combos(self):

        def find_candiadates(yuhun='_'):
            # 寻找候选御魂
            candidates = []
            if yuhun == '_' or yuhun == 0:
                candidates = data_format.MITAMA_NAMES
            elif yuhun in data_format.MITAMA_NAMES:
                candidates.append(yuhun)
            elif yuhun in data_format.MITAMA_PROPS:
                for name in data_format.MITAMA_NAMES:
                    if data_format.MITAMA_ENHANCE[name]['加成类型'] == yuhun:
                        candidates.append(name)
            return candidates

        # 获取御魂组合
        main_candiadates = []
        secondary_candiadates = []
        if len(self.plan) == 2:
            # 4 + 2 的情况
            main_candiadates = find_candiadates(self.plan[4])
            secondary_candiadates = find_candiadates(self.plan[2])
            for four in main_candiadates:
                for two in secondary_candiadates:
                    yield [four, four, four, four, two, two]

    def get_yuhun_permutations(self):
        # 生成御魂排列
        combo_list = self.get_yuhun_combos()
        for combo in combo_list:
            for perm in set(itertools.permutations(combo)):
                yield perm

    def make_combocation(self):
        # 生成组合
        yuhun_permutations = self.get_yuhun_permutations()
        product_list = []
        total_combo_num = 0
        for perm in yuhun_permutations:
            comb_yuhun_list = [[], [], [], [], [], []]
            for index, name in enumerate(perm):
                for yuhun in self.yuhun_dict[index + 1]:
                    if yuhun['name'] == name:
                        comb_yuhun_list[index].append(yuhun)
            cur_combo_num = reduce(lambda x, y: x * y, map(len, comb_yuhun_list))
            if cur_combo_num:
                total_combo_num += cur_combo_num
                product_list.append(itertools.product(*comb_yuhun_list))
        print('组合数：', total_combo_num)
        return itertools.chain(*product_list)

    def pipeline(self):
        combo_list = self.make_combocation()
        combo_list = map(lambda x: self.add_yuhun_name(x), combo_list)
        combo_list = map(lambda x: self.add_sum_props(x), combo_list)
        # combo = combo_list.__next__()
        # print(combo)
        for prop in self.limit_props:
            combo_list = self.filter_prop_limit(combo_list, prop)
        # print(self.calc_pane(combo))
        combo_list = map(lambda x: self.calc_pane(x), combo_list)
        print(max(combo_list, key=lambda dic: dic['optimize_pane']))

    def add_yuhun_name(self, combo):
        yuhun_name_count = {}
        for yuhun in combo:
            if yuhun['name'] in yuhun_name_count:
                yuhun_name_count[yuhun['name']] += 1
            else:
                yuhun_name_count[yuhun['name']] = 1

        return {
            'summary': yuhun_name_count,
            'info': list(combo)
        }

    def add_sum_props(self, combo):
        # 六个位置及套装属性求和
        yuhun_pane = dict(zip(self.effective_props, [0]*len(self.effective_props)))
        for yuhun in combo['info']:
            for (k, v) in yuhun['props'].items():
                if k in self.effective_props:
                    yuhun_pane[k] += v
        # 算上御魂效果的加成 有效属性
        for k, v in combo['summary'].items():
            if v < 2:
                continue
            prop_type = data_format.MITAMA_ENHANCE[k]['加成类型']
            if prop_type in self.effective_props:
                yuhun_pane[prop_type] += data_format.MITAMA_ENHANCE[k]['加成数值']
        combo['yuhun_pane'] = yuhun_pane
        # combo['info'] = list(map(lambda x: x['id'], combo['info']))
        return combo

    def calc_pane(self, combo):
        pane = 0
        if self.optimize_pane == '输出伤害':
            # 输出伤害 = ((式神基础攻击 * (1 + 攻击加成)) + 小攻击) * (基础暴伤 + 御魂暴伤)
            pane = ((self.shishen_pane['攻击'] * (1 + combo['yuhun_pane']['攻击加成'])) +
                    combo['yuhun_pane']['攻击']) * (self.shishen_pane['暴击伤害'] + combo['yuhun_pane']['暴击伤害'])
        if self.optimize_pane == '双重暴击':
            # 双重暴击 = ((式神基础攻击 * (1 + 攻击加成)) + 小攻击) * (基础暴伤 + 御魂暴伤) ^ 2
            pane = ((self.shishen_pane['攻击'] * (1 + combo['yuhun_pane']['攻击加成'])) +
                    combo['yuhun_pane']['攻击']) * pow(self.shishen_pane['暴击伤害'] + combo['yuhun_pane']['暴击伤害'], 2)
        if self.optimize_pane == '生命治疗':
            # 生命治疗 = ((式神基础生命 * (1 + 生命加成)) + 小生命) * (基础暴伤 + 御魂暴伤)
            pane = ((self.shishen_pane['生命'] * (1 + combo['yuhun_pane']['生命加成'])) +
                    combo['yuhun_pane']['生命']) * (self.shishen_pane['暴击伤害'] + combo['yuhun_pane']['暴击伤害'])
        combo['optimize_pane'] = pane
        return combo

    def filter_prop_limit(self, combo_list, prop_name):
        return filter(lambda x: self.limit_props[prop_name]['min'] <= x['yuhun_pane'].get(prop_name, 0) <= self.limit_props[prop_name]['max'], combo_list)

    def filter_lower_yuhun(self, yuhun_list=[]):
        # 过滤御魂属性较弱的御魂 不能比较[非自由]属性
        # 比如 一号位 3攻击 8暴击 就不如一个 5攻击 8暴击的 此时把前者过滤掉
        # [非自由]属性 定义:如果速度有上限 那3速度和5速度相比 都有可能是最佳属性 此时不能过滤掉前者
        not_free_prop_list = [k for k, v in self.limit_props.items() if v.get('max', 0) < float('inf')]
        need_remove_list = []
        for yh_a in yuhun_list:
            if set(yh_a['props'].keys()) & set(not_free_prop_list):
                continue
            # 御魂a 与御魂list进行比较, 如果御魂list中存在完胜御魂a的 则将a剔除掉
            for yh_b in yuhun_list:
                if yh_a['id'] in need_remove_list:
                    continue
                if set(yh_a['props'].keys()) & set(not_free_prop_list):
                    continue
                if yh_a['id'] == yh_b['id'] or yh_a['name'] != yh_b['name'] or yh_a['main_prop'] != yh_b['main_prop']:
                    continue

                a_better_than_b = False
                for porp in self.effective_props:
                    yh_a_porp = yh_a['props'].get(porp, 0)
                    yh_b_porp = yh_b['props'].get(porp, 0)
                    if yh_a_porp > yh_b_porp:
                        a_better_than_b = True
                        break
                if not a_better_than_b:
                    need_remove_list.append(yh_a['id'])
        good_list = [yuhun for yuhun in yuhun_list if yuhun['id'] not in need_remove_list]
        print(f'已过滤御魂{len(need_remove_list)}个')
        return good_list
