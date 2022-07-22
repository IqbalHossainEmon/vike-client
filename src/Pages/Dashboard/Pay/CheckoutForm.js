import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Typography from "@mui/material/Typography";
import axios from "axios";

const CheckoutForm = ({ order }) => {
	const { name, email, price } = order;
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [btnDisable, setbtnDisable] = useState(false);

	useEffect(() => {
		axios
			.post("https://cryptic-mesa-14109.herokuapp.com/create-payment-intent", {
				price,
			})
			.then((result) => setClientSecret(result.data.clientSecret));
	}, [price]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}
		const card = elements.getElement(CardElement);

		if (card == null) {
			return;
		}
		setbtnDisable(true);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			setError(error.message);
		} else {
			console.log("[PaymentMethod]", paymentMethod);
		}
		const { paymentIntent, error: intentError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name,
						email,
					},
				},
			});
		if (intentError) {
			setError(intentError.message);
		} else {
			setSuccess("successfull");
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>
				<button type='submit' disabled={!stripe || btnDisable}>
					Pay
				</button>
				<Typography>{error ? error : success}</Typography>
			</form>
		</div>
	);
};

export default CheckoutForm;
