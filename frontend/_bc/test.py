x = [{'name': 'A06 Ut SY', 'id': 'A06 Ut SY.FCS'}, {'name': 'A02 Kranvatten kvall SYBR', 'id': 'A02 Kranvatten kvall SYBR.fcs'}]

fileList = []
for i in x:
    print(i["id"])
    fileList.append(i["id"])
    
print(fileList)