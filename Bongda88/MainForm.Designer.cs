namespace Bongda88
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.loginButton = new System.Windows.Forms.Button();
            this.GetHtmlButton = new System.Windows.Forms.Button();
            this.ResultText = new System.Windows.Forms.RichTextBox();
            this.StatusLabel = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // loginButton
            // 
            this.loginButton.Location = new System.Drawing.Point(16, 17);
            this.loginButton.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.loginButton.Name = "loginButton";
            this.loginButton.Size = new System.Drawing.Size(99, 32);
            this.loginButton.TabIndex = 0;
            this.loginButton.Text = "Login";
            this.loginButton.UseVisualStyleBackColor = true;
            // 
            // GetHtmlButton
            // 
            this.GetHtmlButton.Location = new System.Drawing.Point(16, 57);
            this.GetHtmlButton.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.GetHtmlButton.Name = "GetHtmlButton";
            this.GetHtmlButton.Size = new System.Drawing.Size(99, 32);
            this.GetHtmlButton.TabIndex = 2;
            this.GetHtmlButton.Text = "Get HTML";
            this.GetHtmlButton.UseVisualStyleBackColor = true;
            this.GetHtmlButton.Click += new System.EventHandler(this.button1_Click);
            // 
            // ResultText
            // 
            this.ResultText.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.ResultText.Location = new System.Drawing.Point(16, 96);
            this.ResultText.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.ResultText.Name = "ResultText";
            this.ResultText.Size = new System.Drawing.Size(512, 324);
            this.ResultText.TabIndex = 3;
            this.ResultText.Text = "";
            // 
            // StatusLabel
            // 
            this.StatusLabel.AutoSize = true;
            this.StatusLabel.Location = new System.Drawing.Point(123, 23);
            this.StatusLabel.Name = "StatusLabel";
            this.StatusLabel.Size = new System.Drawing.Size(0, 18);
            this.StatusLabel.TabIndex = 4;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 18F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(546, 440);
            this.Controls.Add(this.StatusLabel);
            this.Controls.Add(this.ResultText);
            this.Controls.Add(this.GetHtmlButton);
            this.Controls.Add(this.loginButton);
            this.Font = new System.Drawing.Font("Code New Roman", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.Name = "MainForm";
            this.Text = "Bong88";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button loginButton;
        private System.Windows.Forms.Button GetHtmlButton;
        private System.Windows.Forms.RichTextBox ResultText;
        private System.Windows.Forms.Label StatusLabel;
    }
}

