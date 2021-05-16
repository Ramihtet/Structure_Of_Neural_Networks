from numpy.lib.shape_base import split
import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_excel(r"C:\Users\user\Desktop\299B\code\Neataptic\results\results_relational_1.xlsx")
accuracies = data["Accuracy"]
av_short = data["av_short"]
av_cluster = data["av_cluster"]


lay1,lay2,acc = [],[],[]

for entry in range(len(av_short)):
    layer1_count = av_short[entry]
    layer2_count = av_cluster[entry]

    lay1.append(layer1_count)
    lay2.append(layer2_count)


all_data = list(zip(lay1,lay2,acc))
plt.scatter(lay1,accuracies)
plt.xlabel("av_short")
plt.ylabel("Accuracy")
plt.show()

plt.scatter(lay2,accuracies)
plt.xlabel("av_cluster")
plt.ylabel("Accuracy")
plt.show()



ax = plt.axes(projection='3d')
ax.set_xlabel('av_short')
ax.set_ylabel('av_cluster')
ax.set_zlabel('Accuracy')

fig = plt.figure()
ax = plt.axes(projection='3d')
ax.scatter3D(lay1, lay2, accuracies, c=accuracies, cmap='Greens');
plt.show()



