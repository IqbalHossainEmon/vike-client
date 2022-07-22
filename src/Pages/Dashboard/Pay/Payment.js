import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
	"pk_test_51JwQuZEYUhTjj8e59wYoxLbqLRofz3LdAG13xdM05gH5bIu3xYv4XEa91w2pI2WK8Hj0KYy5wNSVQqqkPBXugIlD00vi91YCjP",
);

const Payment = () => {
	const { id } = useParams();
	const [order, setOrder] = useState({});
	useEffect(() => {
		axios
			.get(`https://cryptic-mesa-14109.herokuapp.com/order/${id}`)
			.then((result) => setOrder(result.data));
	}, [id]);

	return (
		<div className='mt-5 pt-5'>
			<h2>{order.name}</h2>
			<h3>Price: $ {order.price}</h3>
			{order.price && (
				<Elements stripe={stripePromise}>
					<CheckoutForm order={order} />
				</Elements>
			)}
		</div>
	);
};

export default Payment;
