namespace ApiEmployee.Models
{
    public class Employee
    {
        
        public string DocNumber { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Department { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        // Decimal es mejor para dinero
        public decimal Salary { get; set; }
    
}
}
