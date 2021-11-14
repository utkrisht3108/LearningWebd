using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank
{
    //this is how a bank acc looks like
    internal class BankAccount
    {
        public string Number { get; }
        public string Owner { get; set; }
        public decimal Balance
        {
            get
            {
                decimal balance = 0;
                foreach (var item in allTransactions)
                {
                    balance += item.Amount;
                }
                return balance;
            }
        }

        private static int accountNumberSeed = 1234567890;

        //keeping this public because i want to show the amount spent
        public List<Transaction> allTransactions = new List<Transaction>();

        public BankAccount(string name, decimal initialBalance)//inside are the arguments and bankacc is an object(a form where arg are form fields)
        {
            //setting properties
            this.Owner = name;
            MakeDeposit(initialBalance, DateTime.Now, "initial balance");
            this.Number = accountNumberSeed.ToString();
            accountNumberSeed++;
        }

        public void MakeDeposit(decimal amount, DateTime date, string note)
        {
            if (amount <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(amount), "Amount must be positive");
            }
            var deposit = new Transaction(amount, date, note);
            allTransactions.Add(deposit);
        }

        public void MakeWithdrawl(decimal amount, DateTime date, string note)
        {
            if (amount <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(amount), "Amount of withdrawl must be positive");
            }
            if (Balance < amount)
            {
                throw new InvalidOperationException("gareeb hai tu");
            }
            var withdrawl = new Transaction(-amount, date, note);
            allTransactions.Add(withdrawl);
        }

        public string GetAccountHistory()
        {
            //header
            var report = new StringBuilder();
            report.AppendLine("Date\t\tAmount\tNote");
            //rows
            foreach(var item in allTransactions)
            {
                report.AppendLine($"{item.Date.ToShortDateString()}\t{item.Amount}\t{item.Notes}");
            }
            return report.ToString();
        }
    }
}
