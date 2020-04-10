from load_yuhun_json import load_json_file
import algo


yuhun_list = load_json_file('yuhun.json')[1:]
l2_prop_limit = ['攻击加成']
l4_prop_limit = ['攻击加成']
l6_prop_limit = ['暴击', '暴击伤害']
optimize = '输出伤害'
limit_props = {
    '速度': {'min': 0, 'max': 128}
}
plan = {4: '狂骨', 2: '荒骷髅'}
yuhun = algo.YuhunComb(yuhun_list, l2_prop_limit, l4_prop_limit,
                       l6_prop_limit, optimize, limit_props, plan)
yuhun.run()
yuhun.make_combocation()
