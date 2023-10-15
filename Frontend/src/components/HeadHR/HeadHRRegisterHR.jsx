import { React, useState } from 'react';
import "./HeadHRStyles/HeadHRRegisterHRStyles.css";

const HeadHRRegisterHR = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        gender: '',
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const photoFile = e.target.files[0];
        setFormData({ ...formData, photo: photoFile });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className='register-hr-main-component'>
            <div className='register-hr-component'>
                <h1>HR Registration</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>First Name:</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Phone Number:</label>
                            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label>Photo:</label>
                            <input type="file" name="photo" onChange={handlePhotoChange} accept="image/*" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HeadHRRegisterHR;