using ApiEmployee.Models;
using ApiEmployee.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ApiEmployee.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;

        public EmployeesController(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repository.GetAllAsync();
            return Ok(result);
        }


        [HttpGet("search/{department}")]
        public async Task<IActionResult> SearchByDepartment(string department)
        {
            var result = await _repository.SearchByDepartmentAsync(department);
            return Ok(result);
        }



        [HttpPost]
        public async Task<IActionResult> Create(Employee employee)
        {
            // La validación de FluentValidation ocurre automáticamente aquí.
            // Si hay error, devuelve 400 Bad Request por defecto.

            try
            {
                await _repository.AddAsync(employee);
                return CreatedAtAction(nameof(GetAll), new { doc = employee.DocNumber }, employee);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message); // Retorna error si la cédula ya existe
            }
        }

        [HttpPut("{docNumber}")]
        public async Task<IActionResult> Update(string docNumber, Employee employee)
        {
            if (docNumber != employee.DocNumber)
                return BadRequest("El número de documento no coincide.");

            var updated = await _repository.UpdateAsync(employee);

            if (!updated) return NotFound($"Empleado con cédula {docNumber} no encontrado.");

            return NoContent(); // 204 No Content es estándar para updates exitosos
        }


        [HttpDelete("{docNumber}")]
        public async Task<IActionResult> Delete(string docNumber)
        {
            var deleted = await _repository.DeleteAsync(docNumber);

            if (!deleted) return NotFound($"Empleado con cédula {docNumber} no encontrado.");

            return NoContent();
        }
    }
}
