import os
# declare availble list relative path file from res/
res_list = '';
for root, dirs, files in os.walk("res"):
    for f in files:
        if f[0] != '.':
            res_list += ('"' + os.path.relpath(os.path.join(root, f), ".") + '",\n')

resource = """var g_resources = [
    %s
];
var g_resources_cardGame = [];
var g_resources_sam = [];
var g_resources_tienlen = [];
var g_resources_bacay = [];
var g_resources_baicao = [];
var g_resources_maubinh = [];
var g_resources_poker = [];
var g_resources_pokertour = [];
var g_resources_lieng = [];
var g_resources_xizach = [];
var g_resources_caro = [];
var g_resources_cotuong = [];
var g_resources_coup = [];
var g_resources_xocdia = [];
var g_resources_mn = [];
var g_resources_mn_tai_xiu = [];
var g_resources_mn_bau_cua = [];
var g_resources_mn_pokego = [];
var g_resouresourceoker = [];
var g_resources_mn_cao_thap = [];
var g_resources_mn_vqmm = [];
var g_resources_slots_kho_bau = [];
var g_resources_nu_diep_vien = [];
var g_resources_avenger = [];
var g_resources_slot_vqv = [];
var g_resources_mn_poker = [];
var g_resources_slot_dctr = [];""" % (res_list)        

# Update file src/resource.js
file = open('src/resource.js','w+')
file.write(resource)
file.close()
