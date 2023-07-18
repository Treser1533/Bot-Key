using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Laucher
{
    public partial class Login : Form
    {
        private readonly IMongoCollection<BsonDocument> usersCollection;
        public Login()
        {
            InitializeComponent();

            var client = new MongoClient("mongodb+srv://Store:5ufpNN77Hh1383l0@store.m2mvqzx.mongodb.net/?retryWrites=true&w=majority");
            var database = client.GetDatabase("test");
            usersCollection = database.GetCollection<BsonDocument>("keys");
        }

        private void guna2Button1_Click(object sender, EventArgs e)
        {
            string key = txtKey.Text;


            var filter = Builders<BsonDocument>.Filter.Eq("key", key);
            var document = usersCollection.Find(filter).FirstOrDefault();


            if (document != null)
            {
                string username = document.GetValue("username").ToString();

                MessageBox.Show("Login bem-sucedido! Bem-vindo, " + username + "!");

                menu mn = new menu();
                mn.Show();
                Hide();
            } else
            {
                MessageBox.Show("Chave inválida!");
            }


        }
    }
}
