export const getResetPasswordTemplate = (username, resetURL) => {
 return `
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml">
 <head>
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta name="x-apple-disable-message-reformatting" />
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
   <meta name="color-scheme" content="light dark" />
   <meta name="supported-color-schemes" content="light dark" />
   <title>Password Reset - E-Shop</title>
   <style type="text/css" rel="stylesheet" media="all">
     @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
     body {
       width: 100% !important;
       height: 100%;
       margin: 0;
       -webkit-text-size-adjust: none;
       background-color: #f2f4f6;
       color: #51545e;
       font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
     }
     a { color: #0077ff; }
     .email-wrapper { width: 100%; background-color: #f2f4f6; padding: 0; margin: 0; }
     .email-content { width: 100%; }
     .email-masthead { padding: 25px 0; text-align: center; }
     .email-masthead_name {
       font-size: 20px;
       font-weight: 700;
       color: #0077ff;
       text-decoration: none;
     }
     .email-body { width: 100%; margin: 0; padding: 0; }
     .email-body_inner {
       width: 570px;
       margin: 0 auto;
       background-color: #ffffff;
       border-radius: 8px;
       overflow: hidden;
     }
     .content-cell { padding: 45px; }
     h1 {
       margin-top: 0;
       color: #333333;
       font-size: 22px;
       font-weight: bold;
     }
     p { font-size: 16px; line-height: 1.6; }
     .button {
       background-color: #0077ff;
       border-radius: 6px;
       color: #ffffff;
       display: inline-block;
       padding: 12px 24px;
       text-decoration: none;
       font-weight: bold;
       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
     }
     .body-action { text-align: center; margin: 30px 0; }
     .email-footer {
       width: 570px;
       margin: 0 auto;
       text-align: center;
       padding: 20px;
     }
     .email-footer p { color: #a8aaaf; font-size: 13px; }
     @media only screen and (max-width: 600px) {
       .email-body_inner, .email-footer { width: 100% !important; }
     }
     @media (prefers-color-scheme: dark) {
       body, .email-body, .email-body_inner, .email-content, .email-wrapper, .email-masthead, .email-footer {
         background-color: #333333 !important;
         color: #ffffff !important;
       }
       p, h1, a, span { color: #ffffff !important; }
     }
   </style>
 </head>
 <body>
   <span class="preheader">Use this link to reset your E-Shop password. The link is only valid for 30 minutes.</span>
   <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
     <tr>
       <td align="center">
         <table class="email-content" width="100%">
           <!-- Header -->
           <tr>
             <td class="email-masthead">
               <a href="https://eshop.com" class="email-masthead_name">E-Shop</a>
             </td>
           </tr>

           <!-- Body -->
           <tr>
             <td class="email-body" width="570">
               <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                 <tr>
                   <td class="content-cell">
                     <h1>Hi ${username},</h1>
                     <p>You recently requested to reset your password for your <strong>E-Shop</strong> account. Click the button below to reset it. This link is valid for the next <strong>30 minutes</strong>.</p>

                     <div class="body-action">
                       <a href="${resetURL}" class="button" target="_blank">Reset Password</a>
                     </div>

                     <p>If you didn’t request this, you can safely ignore this email.</p>
                     <p>Thanks,<br>The E-Shop Team</p>

                     <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaec;" />
                     <p style="font-size: 14px; color: #999;">If the button above doesn’t work, copy and paste this URL into your browser:</p>
                     <p style="font-size: 14px; color: #999;"><a href="${resetURL}">${resetURL}</a></p>
                   </td>
                 </tr>
               </table>
             </td>
           </tr>

           <!-- Footer -->
           <tr>
             <td>
               <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                 <tr>
                   <td class="content-cell" align="center">
                     <p>© ${new Date().getFullYear()} E-Shop. All rights reserved.</p>
                   </td>
                 </tr>
               </table>
             </td>
           </tr>
         </table>
       </td>
     </tr>
   </table>
 </body>
 </html>
 `;
};
