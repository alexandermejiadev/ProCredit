using ApiEmployee.Models;

namespace ApiEmployee.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<IEnumerable<Employee>> SearchByDepartmentAsync(string department);
        Task AddAsync(Employee employee);
        Task<bool> UpdateAsync(Employee employee);
        Task<bool> DeleteAsync(string docNumber);
    }
}

