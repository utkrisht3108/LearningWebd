using System;

namespace Bank
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var account = new BankAccount("Utkrisht", 1000);
            Console.WriteLine($"Account {account.Number} was created for {account.Owner} with {account.Balance}Rs");

            account.MakeWithdrawl(300, DateTime.Now, "Dream11 mai haar gaya");
            Console.WriteLine($"Account {account.Number} -  {account.Owner} with {account.Balance}Rs and amount " +
                $"spent is {Math.Abs(account.allTransactions[account.allTransactions.Count - 1].Amount)}Rs");

            account.MakeDeposit(500, DateTime.Now, "Dream11 mai jeet gaya");
            Console.WriteLine($"Account {account.Number} -  {account.Owner} with {account.Balance}Rs and amount " +
                $"deposited is {Math.Abs(account.allTransactions[account.allTransactions.Count - 1].Amount)}Rs");

            Console.WriteLine(account.GetAccountHistory());

            //ERROR HANDLING
            //account.MakeDeposit(-100, DateTime.Now, "error");
            //try
            //{
            //    var invalidAcc = new BankAccount("invalid", -10);
            //}
            //catch(ArgumentOutOfRangeException e)
            //{
            //    Console.WriteLine("neg paisa");
            //    Console.WriteLine(e.ToString());
            //}
        }
    }
}
