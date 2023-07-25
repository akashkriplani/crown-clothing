import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { FormContainer, PaymentButton, PaymentFormContainer } from './payment-form.styles';

const ifValiCardElement = (card: StripeCardElement | null): card is StripeCardElement =>
  card !== null || card !== undefined;

const PaymentForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!elements || !stripe) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount * 100
      })
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret }
    } = response;

    const cardDetails = elements.getElement(CardElement);

    if (!ifValiCardElement(cardDetails)) {
      return;
    }

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest User'
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(JSON.stringify(paymentResult.error));
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment successful');
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
