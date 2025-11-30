using ApiEmployee.Models;
using System.Text.Json;

namespace ApiEmployee.Repositories.Impl
{
    public class EmployeeRepositoryImpl : IEmployeeRepository
    {
        private readonly string _filePath = "employees.json";

        // Esta opción permite que "docNumber" se lea como "DocNumber"
        private readonly JsonSerializerOptions _options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            WriteIndented = true
        };

        private async Task<List<Employee>> ReadDataAsync()
        {
            if (!File.Exists(_filePath)) return new List<Employee>();
            var json = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<Employee>>(json, _options) ?? new List<Employee>();
        }

        public async Task AddAsync(Employee employee)
        {
            var list = await ReadDataAsync();

            // Validamos que no exista ya ese número de documento
            if (list.Any(e => e.DocNumber == employee.DocNumber))
            {
                throw new InvalidOperationException($"El empleado con documento {employee.DocNumber} ya existe.");
            }

            list.Add(employee);

            var json = JsonSerializer.Serialize(list, _options);
            await File.WriteAllTextAsync(_filePath, json);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await ReadDataAsync();
        }

        public async Task<IEnumerable<Employee>> SearchByDepartmentAsync(string department)
        {
            var all = await ReadDataAsync();
            return all.Where(e => e.Department.Contains(department, StringComparison.OrdinalIgnoreCase));
        }

        private async Task SaveDataAsync(List<Employee> list)
        {
            var json = JsonSerializer.Serialize(list, _options);
            await File.WriteAllTextAsync(_filePath, json);
        }

        public async Task<bool> UpdateAsync(Employee employee)
        {
            var list = await ReadDataAsync();
            var index = list.FindIndex(e => e.DocNumber == employee.DocNumber);

            if (index == -1) return false; // No encontrado

            list[index] = employee; // Reemplazamos el objeto
            await SaveDataAsync(list);
            return true;
        }

        public async Task<bool> DeleteAsync(string docNumber)
        {
            var list = await ReadDataAsync();
            var employee = list.FirstOrDefault(e => e.DocNumber == docNumber);

            if (employee == null) return false; // No encontrado

            list.Remove(employee);
            await SaveDataAsync(list);
            return true;
        }
    }
}
