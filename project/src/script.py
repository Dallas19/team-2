import xlrd
from collections import OrderedDict
import simplejson as json

wb = xlrd.open_workbook('../../United-Way-Code-for-Good-combined-performance-data-v2.xlsx')
sh = wb.sheet_by_index(0)

data_list = []

for rownum in range(1, sh.nrows):
    data = OrderedDict()
    row_values = sh.row_values(rownum)
    data['Sort Order'] = row_values[0]
    data['Investment_ID'] = row_values[1]
    data['Investment_Name'] = row_values[2]
    data['Program_From_Set_Name'] = row_values[3]
    data['Agency_Name'] = row_values[4]
    data['Program_Name'] = row_values[5]
    data['Impact_Area'] = row_values[6]
    data['Strategy_Name'] = row_values[7]
    data['Outcome_Indicator_Type_Name'] = row_values[8]
    data['Outcome_Indicator_Name'] = row_values[9]
    
    data_list.append(data)
j = json.dumps(data_list)

with open('data.json', 'w') as f:
    f.write(j)

