from functools import reduce
import itertools

import data_format


class YuhunComb(object):
    def __init__(self, yuhun_list, l2_prop_limit, l4_prop_limit, l6_prop_limit, optimize, limit_props, plan):
        """Calculate total damage
        Args:
            yuhun_list (list): 御魂列表
            l2_prop_limit (list): 二号位主属性
            optimize (str): 优化目标
            limit_props (dict): 属性限制 如： {'速度': {'min': 0, 'max': 128 } }
            effective_props (list): 有效属性, 计算要用到的
            plan (dict): 御魂套装方案 {'4':'狂骨', '2':'荒骷髅'}
        """
        self.l2_prop_limit = l2_prop_limit
        self.l4_prop_limit = l4_prop_limit
        self.l6_prop_limit = l6_prop_limit
        self.yuhun_dict = self.yuhun_list2dict(yuhun_list)
        self.effective_props = list(set(data_format.MITAMA_PROPS_EFFECT[optimize]) | set(limit_props.keys()))
        self.plan = plan

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
        if len(self.l4_prop_limit):
            self.yuhun_dict[6] = self.filter_loc_prop(self.yuhun_dict[6], self.l4_prop_limit)
        # 过滤不包含有效属性的御魂
        for i in range(1, 7):
            self.yuhun_dict[i] = list(filter(lambda x: len(
                (set(list(x['props'].keys())) & set(self.effective_props))), self.yuhun_dict[i]))

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
        # cart_list = []
        for perm in yuhun_permutations:
            print(perm)

            break
