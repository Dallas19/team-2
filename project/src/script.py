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
    data['Program_Form_Set_Name'] = row_values[4]
    data['Agency_Name'] = row_values[6]
    data['Program_Name'] = row_values[8]
    data['Impact_Area'] = row_values[10]
    data['Strategy_Name'] = row_values[15]
    data['Outcome_Indicator_Type_Name'] = row_values[17]
    data['Outcome_Indicator_Name'] = row_values[20]
    data['Unique Count July 2019'] = row_values[24]
    data['Unique Count August 2019'] = row_values[25]
    data['Unique Count September 2019'] = row_values[26]
    data['Annual Target (if applicable)'] = row_values[27]
    
    data_list.append(data)
j = json.dumps(data_list)

with open('data.json', 'w') as f:
    f.write(j)

