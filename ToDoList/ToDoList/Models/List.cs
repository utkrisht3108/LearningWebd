using System.ComponentModel.DataAnnotations;

namespace ToDoList.Models
{
    public class List
    {
        //make Id column an identity column which is the primary key
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;

    }
}
