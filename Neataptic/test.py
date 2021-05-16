# import random
# from tqdm import tqdm
# all_arr = []
# for i in tqdm(range(300)):
#     lay1 = 0
#     lay2 = 0
#     arr = []
#     for j in range(74):
#         if random.randint(0,100) < 25:
#             arr.append(0)
#         else:
#             if(j>60):lay2+=1
#             else: lay1+=1
#             arr.append(1)
#         if arr not in all_arr:
#             all_arr.append(arr)
# print(len(all_arr))
# f = open("graphs.js","w")
# f.write("gs = {}".format(all_arr))
# f.write("\n")
# f.write("module.exports = {gs};")
test = [1,0,0,0,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1]
print(sum(test))