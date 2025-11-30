using ApiEmployee.Models;
using FluentValidation;

namespace ApiEmployee.Validators
{
    public class EmployeeValidator : AbstractValidator<Employee>
    {
        public EmployeeValidator()
        {
            RuleFor(x => x.DocNumber)
                .NotEmpty().WithMessage("El documento es obligatorio.")
                .Length(10).WithMessage("La cédula debe tener 10 dígitos.")
                .Matches("^[0-9]*$").WithMessage("La cédula solo debe contener números.");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("El nombre es obligatorio.");

            RuleFor(x => x.Surname)
                .NotEmpty().WithMessage("El apellido es obligatorio.");

            RuleFor(x => x.Age)
                .GreaterThan(18).WithMessage("El empleado debe ser mayor de edad.");

            RuleFor(x => x.Department)
                .NotEmpty().WithMessage("El departamento es obligatorio.");

            RuleFor(x => x.Salary)
                .GreaterThan(0).WithMessage("El salario debe ser mayor a 0.");
        }
    }
}

