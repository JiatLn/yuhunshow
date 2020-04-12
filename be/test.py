from load_yuhun_json import load_json_file
import algo


yuhun_list = load_json_file('yuhun.json')[1:]
l2_prop_limit = ['攻击加成']
l4_prop_limit = ['攻击加成']
l6_prop_limit = ['暴击', '暴击伤害']
optimize = '输出伤害'
limit_props = {'速度': {'min': 156-115, 'max': 158-115}, '暴击': {'min': .88, 'max': float('inf')}}
limit_pane = {'输出伤害': {'min': 17800, 'max': float('inf')}}
plan = {4: '狂骨', 2: '荒骷髅'}
shishen_pane = {
    '攻击': 3511,
    '生命': 388,
    '防御': 388,
    '速度': 115,
    '暴击': 0.12,
    '暴击伤害': 1.6,
    '效果命中': 0,
    '效果抵抗': 0
}
yuhun = algo.YuhunComb(yuhun_list, l2_prop_limit, l4_prop_limit,
                       l6_prop_limit, optimize, limit_props, limit_pane, plan, shishen_pane)
yuhun.run()
yuhun.pipeline()
# # print(combo_list.__next__())
# combo = combo_list.__next__()
# print(combo)
