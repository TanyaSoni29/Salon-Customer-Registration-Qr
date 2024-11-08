/** @format */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams,
} from 'react-router-dom';

function App() {
	return (
		<div className='wrapper'>
			<h1
				className='heading'
				// style={{
				// 	display: 'flex',
				// 	justifyContent: 'center',
				// 	alignItems: 'center',
				// 	color: '#000',
				// 	fontSize: '3rem',
				// }}
			>
				Tanning Salon
			</h1>
			<Router>
				<Routes>
					{/* Define route for the registration form that expects an 'id' */}
					<Route
						path='register/:id'
						element={<AddCustomerModal />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;

function AddCustomerModal() {
	const { id } = useParams();
	const preferred_location = id;
	const [successMessage, setSuccessMessage] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const handleSubmitForm = async (data) => {
		try {
			const newUserData = {
				password: data.password,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email || '',
				address: data.address,
				post_code: data.post_code,
				phone_number: data.phone_number,
				dob: data.dob || '',
				gender: data.gender,
				gdpr_sms_active: data.gdpr_sms_active || false,
				gdpr_email_active: data.gdpr_email_active || false,
				referred_by: data.referred_by,
				preferred_location: preferred_location,
				role: 'customer',
			};
			const newUser = await createUser(newUserData);
			console.log(newUser);
			if (newUser) {
				setSuccessMessage(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				password: '',
				firstName: '',
				lastName: '',
				email: '',
				address: '',
				post_code: '',
				phone_number: '',
				gender: '',
				referred_by: '',
				preferred_location: '',
				gdpr_sms_active: false,
				gdpr_email_active: false,
				avatar: '',
			});
		}
	}, [reset, isSubmitSuccessful]);

	return (
		<div className='modal-container'>
			{successMessage ? (
				<p
					style={{
						color: 'green',
						fontSize: '1.5rem',
						textAlign: 'center',
						marginBottom: '20px',
					}}
				>
					Thank you for registering!
				</p>
			) : (
				<>
					{' '}
					<h3 className='modal-title'>Registeration</h3>
					<form onSubmit={handleSubmit(handleSubmitForm)}>
						<div
							style={{
								width: '100%',
								padding: '8px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<div
								style={{
									width: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<input
									type='text'
									placeholder='First Name'
									{...register('firstName', {
										required: 'First name is required',
										maxLength: {
											value: 100,
											message: 'First name cannot exceed 100 characters',
										},
									})}
									style={{
										width: '100%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										backgroundColor: ' #fff' /* Make input background white */,
										color: ' #333' /* Darker text color */,
										outline: 'none' /* Remove default outline */,
										transition: 'border-color 0.3s ease',
									}}
								/>
								{errors.firstName && (
									<p className='error-message'>{errors.firstName.message}</p>
								)}
							</div>
							<div
								style={{
									width: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<input
									type='text'
									placeholder='Last Name'
									{...register('lastName', {
										required: 'Last name is required',
										maxLength: {
											value: 100,
											message: 'Last name cannot exceed 100 characters',
										},
									})}
									style={{
										width: '100%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										backgroundColor: ' #fff' /* Make input background white */,
										color: ' #333' /* Darker text color */,
										outline: 'none' /* Remove default outline */,
										transition: 'border-color 0.3s ease',
									}}
								/>
								{errors.lastName && (
									<p className='error-message'>{errors.lastName.message}</p>
								)}
							</div>
						</div>

						<div className='form-group'>
							{' '}
							<input
								type='email'
								placeholder='Email'
								{...register(
									'email'
									// {
									// 	required: 'Email is required',
									// 	pattern: {
									// 		value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									// 		message: 'Please enter a valid email address',
									// 	},
									// }
								)}
							/>
							{errors.email && (
								<p className='error-message'>{errors.email.message}</p>
							)}
						</div>

						<div
							style={{
								width: '100%',
								padding: '8px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<div
								style={{
									width: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<input
									type='text'
									placeholder='Phone Number'
									{...register(
										'phone_number'
										// {
										// 	required: 'Phone number is required',
										// 	maxLength: {
										// 		value: 15,
										// 		message: 'Phone number must not exceed 15 digits',
										// 	},
										// 	pattern: {
										// 		value: /^[0-9]+$/, // Accepts only numeric values
										// 		message: 'Phone number must contain only numbers',
										// 	},
										// }
									)}
									style={{
										width: '100%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										backgroundColor: ' #fff' /* Make input background white */,
										color: ' #333' /* Darker text color */,
										outline: 'none' /* Remove default outline */,
										transition: 'border-color 0.3s ease',
									}}
								/>
								{errors.phone_number && (
									<p className='error-message'>{errors.phone_number.message}</p>
								)}
							</div>
							<div
								style={{
									width: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<input
									type='password'
									placeholder='Password'
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 6,
											message: 'Password must be at least 6 characters',
										},
									})}
									style={{
										width: '100%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										backgroundColor: ' #fff' /* Make input background white */,
										color: ' #333' /* Darker text color */,
										outline: 'none' /* Remove default outline */,
										transition: 'border-color 0.3s ease',
									}}
								/>
								{errors.password && (
									<p className='error-message'>{errors.password.message}</p>
								)}
							</div>
							<div
								style={{
									width: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<input
									type='date'
									{...register('dob', {
										required: 'Date of birth is required',
									})}
									style={{
										width: '100%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										backgroundColor: '#fff',
										color: '#333',
										outline: 'none',
										transition: 'border-color 0.3s ease',
									}}
								/>
								{errors.dob && (
									<p className='error-message'>{errors.dob.message}</p>
								)}
							</div>
						</div>

						<div className='form-group'>
							<textarea
								rows={2}
								style={{
									width: '100%',
									padding: '10px',
									border: '1px solid #ccc',
									borderRadius: '4px',
									fontSize: '14px',
									backgroundColor: ' #fff' /* Make input background white */,
									color: ' #333' /* Darker text color */,
									outline: 'none' /* Remove default outline */,
									transition: 'border-color 0.3s ease',
								}}
								type='text'
								placeholder='Address'
								{...register('address', { required: true })}
							/>
							{errors.address && (
								<p className='error-message'>{errors.address.message}</p>
							)}
						</div>

						<div
							className=''
							style={{
								width: '100%',
								padding: '8px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<div
								style={{
									width: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<input
									type='text'
									placeholder='Post Code'
									{...register('post_code', { required: true })}
									style={{
										width: '100%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										backgroundColor: ' #fff' /* Make input background white */,
										color: ' #333' /* Darker text color */,
										outline: 'none' /* Remove default outline */,
										transition: 'border-color 0.3s ease',
									}}
								/>
								{errors.post_code && (
									<p className='error-message'>{errors.post_code.message}</p>
								)}
							</div>
							<div
								style={{
									width: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<input
									style={{
										width: '100%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										outline: 'none' /* Remove default outline */,
										transition: 'border-color 0.3s ease',
										backgroundColor: ' #fff' /* Make input background white */,
										color: ' #333' /* Darker text color */,
									}}
									type='text'
									placeholder='Referred By'
									{...register('referred_by')}
								/>
							</div>
							<div
								style={{
									width: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<select
									{...register('gender', { required: true })}
									style={{
										width: '100%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										backgroundColor: ' #fff' /* Make input background white */,
										color: ' #333' /* Darker text color */,
										outline: 'none' /* Remove default outline */,
										transition: 'border-color 0.3s ease',
									}}
								>
									<option value=''>Select Gender</option>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
									<option value='Other'>Other</option>
								</select>
							</div>
						</div>

						<div
							style={{
								width: '100%',
								padding: '8px',
								display: 'flex',
								justifyContent: 'start',
								alignItems: 'center',
								gap: 4,
							}}
						>
							<label
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '5px',
									color: ' #333',
								}}
							>
								<input
									type='checkbox'
									{...register('gdpr_sms_active')}
									style={{
										width: '50%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										backgroundColor: ' #fff' /* Make input background white */,
										color: ' #333' /* Darker text color */,
										outline: 'none' /* Remove default outline */,
										transition: 'border-color 0.3s ease',
									}}
								/>
								SMS
							</label>
							<label
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '5px',
									color: ' #333',
								}}
							>
								<input
									type='checkbox'
									{...register('gdpr_email_active')}
									style={{
										width: '50%',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										fontSize: '14px',
										backgroundColor: ' #fff' /* Make input background white */,
										color: ' #333' /* Darker text color */,
										outline: 'none' /* Remove default outline */,
										transition: 'border-color 0.3s ease',
									}}
								/>
								Email
							</label>
						</div>

						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'end',
								alignItems: 'center',
							}}
						>
							<button
								type='submit'
								className='submit-button'
							>
								Submit
							</button>
						</div>
					</form>
				</>
			)}
		</div>
	);
}

const createUser = async (data) => {
	const toastId = toast.loading('Loading...');
	try {
		// Step 1: Register the user
		const response = await axios.post(
			'https://salon.thetechnoguyz.com/api/AddCustomer',
			{
				firstName: data.firstName || '',
				lastName: data.lastName || '',
				email: data.email || '',
				password: data.password,
				password_confirmation: data.password,
				phone_number: data.phone_number,
				dob: data.dob || '',
				address: data.address || '',
				preferred_location: data.preferred_location || '',
				referred_by: data.referred_by || '',
				gender: data.gender || '',
				post_code: data.post_code,
				role: data.role,
				gdpr_sms_active: data.gdpr_sms_active || false,
				gdpr_email_active: data.gdpr_email_active || false,
			},
			{
				'Content-Type': 'application/json',
			}
		);

		console.log('Create New User API Response:', response.data);
		if (response.status !== 201) throw new Error('Could not create User');

		toast.success('Customer profile created successfully');

		return response.data;
	} catch (error) {
		console.log('Create User API Error', error);
		toast.error(error.response?.data?.error || 'An error occurred');
		return null;
	} finally {
		toast.dismiss(toastId);
	}
};
