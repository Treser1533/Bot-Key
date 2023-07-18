using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Laucher
{
    public partial class menu : Form
    {
        public menu()
        {
            InitializeComponent();
        }

        private void guna2Button1_Click(object sender, EventArgs e)
        {
            Process process = new Process();
            process.StartInfo.FileName = "cmd.exe";
            process.StartInfo.Arguments = "/c del /q /s %temp%\\*";
            process.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
            process.Start();
            process.WaitForExit();

            MessageBox.Show("A pasta de arquivos temporários foi limpa com sucesso.", "Limpeza Concluída", MessageBoxButtons.OK, MessageBoxIcon.Information);

        }
    }
}
