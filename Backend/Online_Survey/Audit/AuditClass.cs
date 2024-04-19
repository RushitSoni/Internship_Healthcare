using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;

namespace Online_Survey.Audit
{
    public class AuditClass
    {
        public void AddAudit(string surveyorId,string action)
        {
            string path = "C:\\Users\\MEET\\Documents\\Internship_Healthcare\\Backend\\Online_Survey\\Audit\\audit.json";
            //string path = "E:\\Internship_27_3\\Internship_Healthcare\\Backend\\Online_Survey\\Audit\\audit.json";

            try
            {
                string existingJson = File.ReadAllText(path);
                List<object> dataList;

                if (string.IsNullOrWhiteSpace(existingJson))
                {
                    // If the file is empty or contains no valid JSON data, initialize an empty list
                    dataList = new List<object>();
                }
                else
                {
                    // Deserialize the JSON data into a list of objects
                    dataList = JsonConvert.DeserializeObject<List<object>>(existingJson);
                }
                
                var jsonObject = new
                {
                    SURVEYORID = surveyorId,
                    DATE = DateOnly.FromDateTime(DateTime.Now),
                    TIME = TimeOnly.FromDateTime(DateTime.Now),
                    ACTION = action
                };

                dataList.Add(jsonObject);

                string jsonData = JsonConvert.SerializeObject(dataList,Formatting.Indented);

                File.WriteAllText(path, jsonData);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
