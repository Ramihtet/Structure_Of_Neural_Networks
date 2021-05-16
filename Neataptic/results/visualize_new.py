from numpy.lib.shape_base import split
import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_excel(r"C:\Users\user\Desktop\299B\code\Neataptic\results\output_2.xlsx")
accuracies = data["Accuracy"]
lays1 = data["Surviving_1"]
lays2 = data["Surviving_2"]


lay1,lay2,acc = [],[],[]

for entry in range(len(lays1)):
    layer1_count = lays1[entry]
    layer2_count = lays2[entry]

    lay1.append(layer1_count)
    lay2.append(layer2_count)


all_data = list(zip(lay1,lay2,acc))
plt.scatter(lay1,accuracies)
plt.show()

plt.scatter(lay2,accuracies)
plt.show()

ax = plt.axes(projection='3d')
fig = plt.figure()
ax = plt.axes(projection='3d')
ax.scatter3D(lay1, lay2, accuracies, c=accuracies, cmap='Greens');
plt.show()



