import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help-center.component.html',
  styleUrl: './help-center.component.css',
})
export class HelpCenterComponent {
  FAQGuide = [
    {
      Title: 'General information',
      Content: [
        {
          expanded: false,
          Q: 'What is Dayra Market',
          A: 'Dayra Market is an innovative online marketplace offering high-quality refurbished electronics at affordable prices with a strong focus on sustainability. We connect eco-conscious consumers with trusted vendors to reduce electronic waste.',

        },
        {
          expanded: false,
          Q: 'How does Dayra Market ensure the quality of refurbished products?',
          A: 'Every product undergoes rigorous inspection and testing. We provide a one-year limited warranty on all products, ensuring they meet our high-quality standards.',

        },

        {
          expanded: false,
          Q: 'How does Dayra Market contribute to sustainability?',
          A: 'By promoting the sale of refurbished electronics, we help reduce electronic waste and conserve valuable resources. Every purchase supports a greener future.',

        },

        {
          expanded: false,
          Q: 'What eco-friendly practices does Dayra Market follow?',
          A: 'We prioritize sustainable sourcing, eco-friendly packaging, and efficient logistics to minimize our environmental impact.',

        },
        {
          expanded: false,
          Q: 'How can I contact Dayra Market’s customer support?',
          A: 'You can reach our customer support team via email, phone, or live chat on our website. We are here to assist you with any questions or concerns.',

        },
      ],
    },
    {
      Title: 'Account',
      Content: [
        {
          expanded: false,
          Q: 'How do I create an account on Dayra Market?',
          A: `Creating an account on Dayra Market is easy and only takes a few steps:

                  1.	Go to the Dayra Market website or app.
                  2.	Click on the “My Account” option at the top right corner of the page.
                  3.	Select the “Sign in” option and you will be directed to the registration page.
                  4.	Enter a valid email address and a secure password.
                  5.	Click on the “Create Account” button at the bottom of the page.
              Your Dayra Market account is now created and you can start shopping. If you have any other questions or need help, you can contact the Dayra Market customer support team for assistance.`,
        },
        {
          expanded: false,
          Q: 'How do I change my account information?',
          A: `If you need to change any information on your Dayra Market account, you can do so by following these steps:

                1.	Log in to your Dayra Market account.
                2.	Go to the "My Account" page and select "My Profile" from the menu.
                3.	Update your personal information, contact details, and password.
                4.	Click "Save" to confirm the changes.`,
        },
        {
          expanded: false,
          Q: 'How do I reset my password?',
          A: `You can reset your password by following these steps:

                1.	Go to the Dayra Market website and click on the “Sign in” button.
                2.	Click on “Forgot Password.”
                3.	We will send a 4-digit verification code to your phone.
                4.	Enter the code on the Dayra Market platform.
                5.	Submit your password reset and use your new password.`,
        },
        {
          expanded: false,
          Q: 'How do I close my account?',
          A: `We regret to see you go but understand if you need to close your Dayra Market account. Just send an email to the Dayra Market customer support team and they will close your account:<a href="mailto:support@dayramarket.com.">support@dayramarket.com</a> `,

        },
        {
          expanded: false,
          Q: 'How do I subscribe to Dayra Market news letter?',
          A: 'To subscribe to the Dayra Market newsletter, go to the Dayra Market website. Scroll to the bottom of the page and look for the "Subscribe to our Newsletter" section. Enter your email address in the provided field and click the "Subscribe" button.',

        },
        {
          expanded: false,
          Q: 'What should I do if my phone number is already linked to another Dayra Market account?',
          A: 'If the phone number you are trying to use for creating an account is already associated with another account, you can reclaim it by contacting customer support. They will confirm that it is your phone number and close the account already linked to it, allowing you to create a new account with that phone number.',

        },
      ],
    },
    {
      Title: 'Payments',
      Content: [
        {
          expanded: false,
          Q: 'What payment methods are used on Dayra Market?',
          A: 'You have the option to use secure payment methods such as bank cards, installments, smart wallets, or Fawry.',

        },
        {
          expanded: false,
          Q: 'How secure is payment information on Dayra Market?',
          A: 'Dayra Market prioritizes customer payment security with encryption and secure servers. Regular monitoring and auditing are also performed to maintain a secure environment for transactions.',

        },
        {
          expanded: false,
          Q: 'What to do If my payment is declined?',
          A: `

          If your payment is declined, check the following:
              •	Ensure the spelling and billing information you entered is accurate.
              •	Ensure your credit card has sufficient funds or that your bank account has enough balance.
              •	Check if there are any restrictions on your card, such as a daily spending limit.
              •	Make sure your card has not expired.
          If you've checked the above and your payment is still declined, contact Dayra Market customer support for assistance. They can be reached through Live Chat or by calling us. It is recommended to keep the details of the error message that appeared during the declined transaction to provide it to Dayra Market customer support for a faster resolution.
          `,
        },
        {
          expanded: false,
          Q: 'I paid for my order and wish to return my item, how will I be refunded?',
          A: 'You will be refunded through the same payment method, meaning that orders paid via card will be refunded back to your bank card.',

        },
        {
          expanded: false,
          Q: 'Cash on delivery is not available, why?',
          A: 'Dayra Market doesn’t accept cash on delivery payments. However, we do provide several other payment options, such as e-wallets and Fawry.',

        },
        {
          expanded: false,
          Q: 'How do I know if my payment has been processed successfully?',
          A: `

          You can check the status of your payment by following these steps:
              1.	Go to the "Orders" section in your account dashboard.
              2.	Find the order in question and check its status. If the payment has been processed successfully, the order status should be "Confirmed."
          `,
        },
        {
          expanded: false,
          Q: 'How long does it take for my payment to be processed?',
          A: 'Most payments on Dayra Market are processed immediately. However, specific processing times may vary depending on the payment method. To ensure quick processing, double-check all information before completing the checkout. If you are experiencing an issue with your payment, contact the Dayra Market customer service team for assistance.',

        },
        {
          expanded: false,
          Q: 'Can I cancel my order and get a refund after payment has been made?',
          A: 'If the order has not yet been accepted by the vendor and shipped, you can cancel the order and get a refund. The refund processing time varies depending on the payment method. If the order has been shipped, you will need to receive your order and then submit a return request to receive your refund.',

        },
        {
          expanded: false,
          Q: 'I tried to pay for my order using my card / mobile money. The funds were debited, but it says my order did not go through. What happened, and how can I get my money back?',
          A: 'Occasionally, technical issues may occur, preventing us from confirming the transaction even though your account may have been debited. You will receive a refund if this issue occurs. Please contact us to request a refund back to your account.',

        },
      ],
    },
    {
      Title: 'Vouchers',
      Content: [
        {
          expanded: false,
          Q: 'What are Dayra Market Vouchers?',
          A: '          Dayra Market vouchers are codes that provide customers with exclusive discounts on their purchases made on the Dayra Market website. These codes can also be issued as a form of refund for canceled or returned orders made through specific payment methods.',

        },
        {
          expanded: false,
          Q: '          How can I use Dayra Market Vouchers?',
          A: `  1.	Log in to your Dayra Market account.

          2.	Go to the "Account" section in the top right menu.
          3.	Select "Vouchers" to view all vouchers linked to your account. You may also receive a voucher code via email or social media.
          4.	Copy the voucher code you want to use.
          5.	During checkout, paste the code in the "Enter Code Here" section and click "Apply."
          6.	Your order total will be updated with the voucher's discount value, and you can proceed with your order by clicking "Confirm Your Order.`,
        },

        {
          expanded: false,
          Q: '          Can I use a voucher on all products on Dayra Market?',
          A: 'Some vouchers may have restrictions, such as being valid only for specific products or categories. The terms and conditions of the voucher will indicate any such restrictions.',

        },

        {
          expanded: false,
          Q: 'How do I know if my voucher is still valid?',

          A: "          You can check the voucher's status on the checkout page. If the voucher has expired or has already been redeemed, it will inform you of the status. Reactivation of the voucher code may not be possible.",

        },
        {
          expanded: false,
          Q: ' Can I use multiple vouchers at once?',

          A: '          Unfortunately, you cannot use multiple vouchers at once. You can only use one voucher per order.',

        },

        {
          expanded: false,
          Q: 'Why is my voucher code not working?',

          A: ` Common reasons why voucher codes might not work and how to resolve them:

              •	Incorrect code: Ensure the code you entered is correct and free of spaces or special characters.
              •	Account specific: Some voucher codes are linked to your Dayra Market account and cannot be used by another account. If the code was received from someone else, it won't work for you.
              •	Already redeemed: Each voucher code can only be used once. If you have already redeemed the code, it will no longer be valid.
              •	Expired: Voucher codes have a limited validity period. If the code has expired, it won't work.
              •	Maximum redemptions reached: Some voucher codes have a maximum number of redemptions. If the maximum has been reached, the code won't work.
          `,
        },

        {
          expanded: false,
          Q: ' Do I need a minimum order value to use my voucher?',

          A: 'The conditions for using voucher codes, including any minimum order values, may vary. Refer to the specific conditions for your voucher.',

        },
      ],
    },
    {
      Title: 'Products',
      Content: [
        {
          expanded: false,
          Q: 'What type of products does Dayra Market offer?',
          A: ' Dayra Market is an online marketplace that specializes in selling refurbished electronic devices. We connect sellers who refurbish and restore used electronic devices with buyers looking for cost-effective and environmentally friendly alternatives to buying new electronics.',

        },
        {
          expanded: false,
          Q: 'Does my product have a warranty?',
          A: 'Dayra Market requires all sellers to offer buyers a limited warranty. The Seller warrants to the original Buyer that the product shall be free from defects in materials and workmanship under normal use for 12 months after the delivery date.',

        },
        {
          expanded: false,
          Q: 'How do I search for a specific product?',
          A: "Use the search bar at the top of the Dayra Market website. Enter the name of the product you are looking for and click the 'search' button. You can narrow down your search results by selecting filters such as price range, brand, and more.",

        },
        {
          expanded: false,
          Q: 'How can I view product details and specifications?',
          A: "Click on the product's listing. Scroll down to the bottom of the page to find a detailed description of the product's features and specifications, including images, ratings, reviews from other customers, and related items.",

        },

        {
          expanded: false,
          Q: 'How do I know if a product is in stock?',
          A: 'All devices listed on Dayra Market are in stock at the vendors. If a product is no longer available, customer support will allocate a replacement with the same specs and conditions for you.',

        },

        {
          expanded: false,
          Q: 'How do I provide feedback or write a review for a product?',

          A: `   1.	Go to your "Account" in the top right corner of the main page.

            2.	Choose “Pending Reviews.”
            3.	Find the item you purchased and select “Write a Review.”
            4.	Provide your feedback regarding the product and submit it.
        Your feedback will be visible to other customers and can help them make informed decisions when purchasing from Dayra Market.`,
        },
      ],
    },
    {
      Title: 'Delivery',
      Content: [
        {
          expanded: false,
          Q: 'How can I track my delivery?',
          A: `   1.	Log in to your account.

    2.	Click on the "My Account" button and select "Orders" from the dropdown menu.
    3.	Locate the order for which you want to track the delivery and click on the "View Details" button.
    4.	Check the delivery status under the "Order Information" section.
If you have any concerns about the delivery status, contact the Dayra Market customer support team by email or live chat.`,
        },

        {
          expanded: false,
          Q: 'What if I am not available to receive my delivery?',
          A: `

If you are not available to receive your delivery, you have the following options:
    • You can arrange for someone else to receive it on your behalf by providing their name and contact information to the delivery agent. It is important to ensure that this person is available at the same address that was provided when placing your order and provide him with the security code sent to you by the courier company else he will not be able to receive the delivery.

    • Contact the delivery agent to reschedule the delivery for a more convenient time.
Note: It is not possible to change the delivery address once an order is placed. Dayra Market will make a total of 2 attempts to deliver the package before canceling your order. You will be notified before they make the second attempt, so it's important to remain available to avoid order cancellation.
`,
        },
        {
          expanded: false,
          Q: 'Can I change my delivery address after placing an order?',
          A: `

    •	Arrange for someone else to receive it on your behalf by providing their name and contact information to the delivery agent. Ensure that this person is available at the same address and provide them with the security code sent by the courier company.
    •	Contact the delivery agent to reschedule the delivery for a more convenient time.
Note: It is not possible to change the delivery address once an order is placed. Dayra Market will make two delivery attempts before canceling your order. You will be notified before the second attempt.

`,
        },

        {
          expanded: false,
          Q: 'How long does delivery usually take?',

          A: 'Delivery timelines vary by area. Check the product page and during the checkout process for more information.',

        },

        {
          expanded: false,
          Q: 'What is the delivery fee?',

          A: 'The delivery fee varies based on factors such as geographic location, delivery method, shipment method, and the size or category of the product ordered. Review the delivery fee before placing your order on the product page and during the checkout process.',

        },
        {
          expanded: false,
          Q: 'What do I do if my delivery has not arrived within the estimated time frame?',
          A: `

            •	Check the order information page in your Dayra Market account for any updates on the delivery status.
            •	Monitor communication sent through push notifications, emails, and the app inbox for updates.
            •	Contact the delivery agent using the contact information provided in the "out for delivery" email.
            •	If you are unable to reach the delivery agent or the delivery status has not been updated, contact the Dayra Market customer support team.
            `,
        },

        {
          expanded: false,
          Q: 'Who do I contact if there is a problem with my delivery?',
          A: `Report any issues with your Dayra Market order through:

                •	Live Chat support on the website and app.
                •	Email via the Dayra Market contact us page.
                •	Calling the phone support line at <a href="tel:+201012223305">+201012223305</a>  (available 7 Days a week, 9am to 8pm).
                `,
        },

        {
          expanded: false,
          Q: 'What happens if my delivery is damaged upon delivery?',
          A: 'If your delivery arrives damaged, contact our customer support team immediately through Live Chat, email, or by calling us. Our customer service representatives will assist you in resolving the issue. Promptly inspect your delivery upon arrival and report any damages.',

        },
      ],
    },
    {
      Title: 'Orders',
      Content: [
        {
          expanded: false,
          Q: ' How to place an order on Dayra Market?',
          A: ` 1.	Browse and select the desired product(s).

          2.	Click on "Add to Cart."
          3.	Proceed to checkout and enter your delivery information.
          4.	Select a payment method and complete the payment process (Prepaid).
          5.	Confirm your order and wait for delivery.`,
        },
        {
          expanded: false,
          Q: 'What payment methods are accepted on Dayra Market?',
          A: 'Secure payment methods include bank cards, installments, smart wallets, or Fawry.',

        },

        {
          expanded: false,
          Q: ' How can I track my order?',

          A: `     1.	Log in to your account.

                2.	Click on the "My Account" button and select "Orders" from the dropdown menu.
                3.	Locate the order for which you want to track the delivery and click on the "View Details" button.
                4.	Check the delivery status under the "Order Information" section.
          If you have any concerns about the delivery status, contact the Dayra Market customer support team by email or live chat.
          `,
        },
        {
          expanded: false,
          Q: 'How to cancel items or orders?',
          A: `

              1.	Log in to your Dayra Market account.
              2.	Go to your "Orders" page.
              3.	Find the order you want to cancel.
              4.	Click the "Cancel order" button and follow the prompts to complete the cancellation process.
          Note: If the order has not yet been accepted by the vendor and shipped, you can cancel the order and get a refund. If the order has been shipped, you will need to receive your order and then submit a return request to receive your refund.
          `,
        },

        {
          expanded: false,
          Q: 'What is the return and refund policy?',
          A: `

          •	Return: You can request a return within the first 14 days from the delivery date if you change your mind about a product and it has not been used or damaged. If you receive a product with an apparent defect/damage, or a product with a wrong (color/size/model), or any shortage of product belongings or accessories, inform us within a maximum of 48 hours from the delivery date.
          •	Refunds: If your return request is approved, you will receive a refund in the refund method you chose while issuing your return.`,
        },

        {
          expanded: false,
          Q: ' How do I report an issue or contact customer support?',
          A: `Report issues with your Dayra Market order or contact customer support through:

          •	Live Chat support on the website and app.
          •	Email via the Dayra Market contact us page.
          •	Calling the phone support line at +201012223305`,
        },
      ],
    },
    {
      Title: 'Returns & Refunds',
      Content: [
        {
          expanded: false,
          Q: 'Do I have to pay for delivery fees when I return an order?',

          A: 'You do not need to pay for delivery fees when returning a product to Dayra Market, unless indicated otherwise by customer support.',

        },
        {
          expanded: false,
          Q: 'I submitted my return request, but have changed my mind and no longer wish to return the item. What should I do?',
          A: `Cancel your return request by contacting us via Live Chat or calling us at +201012223305 If you have already been contacted for pickup, you may request the delivery associate to cancel it on your behalf.`,

        },
        {
          expanded: false,
          Q: 'What is Dayra Market return policy?',
          A: `

•	Return: Request a return within 14 days from the delivery date if you change your mind about a product and it has not been used or damaged. For apparent defects/damages or wrong products (color/size/model) or shortages in product belongings or accessories, inform us within a maximum of 48 hours from the delivery date.
•	Refunds: If your return request is approved, you will receive a refund in the refund method you chose while issuing your return.
`,
        },
        {
          expanded: false,
          Q: 'How do I intiate a return on Dayra Market?',
          A: `1.	Log in to your Dayra Market account and go to "Orders."

2.	Click on the order you want to return.
3.	Select the item(s) you want to return and provide a reason for the return.
4.	Review your information and submit your return request.`,
        },
        {
          expanded: false,
          Q: 'What if I received a damged, defective or wrong item?',
          A: 'If your delivery arrives damaged, defective, or wrong, contact our customer support team through Live Chat, email, or by calling us. Our customer service representatives will assist you in resolving the issue.',

        },
        {
          expanded: false,
          Q: 'How long does it take to process a return on Dayra Market?',
          A: 'It typically takes 2-6 business days to process the refund from Dayra Market.',

        },
        {
          expanded: false,
          Q: 'How will I receive my refund after returning an order to Dayra Market?',

          A: 'You will receive the refund through the same method you used when paying for your order.',

        },
        {
          expanded: false,
          Q: 'How Long does it take to receive the refund?',
          A: `

Payment methods \t\t	Refund method \t\t 	Refund timeline
Bank Card \t\t 	Bank Card	\t\t 7 to 14 Working days
Installment \t\t 	Credit card	\t\t 7 to 14 Working days
Installment \t\t 	Consumer finance	\t\t 7 to 14 Working days
Smart wallet \t\t 	Smart wallet	\t\t 7 to 14 Working days
Fawry	 \t\t Refund Voucher	\t\t Same day
Dayra Market offers you the following refund methods as shown in the table below:

Note that refund methods availability is based on the payment method used to pay for the order being returned, in case of requesting a refund voucher we will not be able to change the refund method later.
`,
        },
        {
          expanded: false,
          Q: 'Does my product have a warranty?',

          A: 'Dayra Market requires all sellers to offer buyers a limited warranty. The Seller warrants to the original Buyer that the product shall be free from defects in materials and workmanship under normal use for 12 months after the delivery date.',

        },

        {
          expanded: false,
          Q: 'Why was my return request declined and the item sent back to me?',
          A: 'Your return request was declined because the eligibility conditions for return were not met, or the return claim could not be confirmed after thorough testing. If your return request is rejected, we will make two redelivery attempts within 7 business days. If both attempts are unsuccessful, the product will be returned to Dayra Market, and you will need to collect it from our warehouse.',

        },
        {
          expanded: false,
          Q: 'Is it possible to exchange an item instead of requesting a return and refund?',
          A: 'Currently, Dayra Market does not offer an exchange option for items. However, you can return an item and receive a full refund within the first 14 days from the delivery date.',

        },
        {
          expanded: false,
          Q: 'I received a refund confirmation, but the amount received is incorrect. What should I do?',
          A: 'If you believe the refund amount is incorrect, contact us for further investigation and resolution via Live Chat, email, or by calling us at <a href="tel:+201012223305">+201012223305</a> ',

        },

        {
          expanded: false,
          Q: 'Will I get my delivery fees refunded when returning an item?',
          A: 'The refund amount will include the delivery fees',

        },
        {
          expanded: false,
          Q: 'How do I track my retun status?',
          A: 'Keep track of your return status through email, push notifications, and updates from Dayra Market. You can also check our Return Timelines for further information.',

        },
      ],
    },
    {
      Title: 'Sell on Dayra Market',
      Content: [
        {
          expanded: false,
          Q: 'What is Dayra Market?',
          A: 'Dayra Market is an e-commerce platform that allows businesses and individuals to sell their refurbished consumer electronics online to a large customer base.',

        },
        {
          expanded: false,
          Q: 'How do I become a Dayra Market seller?',

          A: 'To become a Dayra Market seller, register as a vendor on the Dayra Market website, list your product catalog, and start selling.',

        },
        {
          expanded: false,
          Q: 'What kind of products can I sell on Dayra Market?',
          A: 'You can sell a wide range of refurbished consumer electronics like smartphones, laptops, tablets, computers, and more.',

        },
        {
          expanded: false,
          Q: 'Is it free to sell on Dayra Market?',
          A: 'Opening a store on Dayra Market is free. However, there are fees and commissions for delivered products.',

        },
        {
          expanded: false,
          Q: 'How do I list my products on Dayra Market?',

          A: 'To list your products, create a seller account, complete the new seller training, provide product details, and upload product images.',

        },
        {
          expanded: false,
          Q: 'How does Dayra Market handle customer returns and refunds?',

          A: 'Dayra Market has a Returns and Refund Policy in place to handle customer complaints and ensure a smooth customer experience.',

        },
        {
          expanded: false,
          Q: 'What support does Dayra Market provide to its sellers?',
          A: 'Dayra Market provides various support services to its sellers, including training, account management, marketing support, and vendor support service.',

        },
        {
          expanded: false,
          Q: 'How does Dayra handle shipping and delivery?',
          A: 'Dayra Market handles all shipping and delivery for products sold on the platform.',

        },
        {
          expanded: false,
          Q: 'How do I get paid for sales made on Dayra Market?',
          A: 'Sellers receive payments for their sales on Dayra Market through bank transfers.',

        },
      ],
    },
  ];
  selectedItems = this.FAQGuide[0];
  searchTerm :any[]=[];
  isSearching = false;

  changeContent(e: Event, item: any) {
    this.selectedItems = item;
    this.isSearching=false;
    const currentElem = e.currentTarget as HTMLElement;
    const parentElem = currentElem.parentElement;
    const allSiblings = parentElem?.querySelectorAll('li') ?? [];
    allSiblings.forEach((sibling) => sibling.classList.remove('active'));
    currentElem.classList.add('active');
  }
  searchHandler(e:Event)
  {
    this.isSearching=true;
    this.searchTerm=[];
    const searchValue = (e.target as HTMLInputElement).value;
      for (const element of this.FAQGuide) {
        for (const content of element.Content) {
          if (element.Title.includes(searchValue) || content.Q.includes(searchValue) || content.A.includes(searchValue) ){
          this.searchTerm.push({
            Q:content.Q,
            A: content.A,
            Title: element.Title,
            expanded: false,
          })
        }
      }
    }
  }
}
