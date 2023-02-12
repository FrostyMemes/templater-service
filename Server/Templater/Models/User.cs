﻿namespace Templater.Models;


[Index(nameof(Email),IsUnique = true)]
public class User
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Nickname field is required.")]
    public string Nickname { get; set; }
    
    [Required(ErrorMessage = "Email field is required.")]
    [EmailAddress]
    public string Email { get; set; }
}