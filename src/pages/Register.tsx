import React, { useState } from 'react';
import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonModal,
  IonPage,
  IonText,
  IonTitle
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
  <IonAlert
    isOpen={isOpen}
    onDidDismiss={onClose}
    header="Notification"
    message={message}
    buttons={['OK']}
  />
);

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith("@nbsc.edu.ph")) {
      setAlertMessage("Only @nbsc.edu.ph emails are allowed to register.");
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }

    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error("Account creation failed: " + error.message);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: insertError } = await supabase.from("users").insert([
        {
          username,
          user_email: email,
          user_firstname: firstName,
          user_lastname: lastName,
          user_password: hashedPassword
        }
      ]);

      if (insertError) throw new Error("Failed to save user data: " + insertError.message);
      setShowSuccessModal(true);
    } catch (err) {
      setAlertMessage(err instanceof Error ? err.message : "An unknown error occurred.");
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding bg-gradient-to-br from-green-50 to-green-100">
        <div className="flex items-center justify-center min-h-screen">
          <IonCard className="w-full max-w-md mx-auto rounded-3xl shadow-2xl">
            <IonCardHeader className="text-center mt-6">
              <IonAvatar className="mx-auto w-24 h-24">
                <img
                  src="https://i.pinimg.com/736x/83/48/67/834867345c35b4a6ccec9948535c8d6b.jpg"
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </IonAvatar>
              <IonCardTitle className="text-2xl font-bold mt-4 text-green-800">User Registration</IonCardTitle>
            </IonCardHeader>

            <IonCardContent className="space-y-4">
              <IonInput label="Username" labelPlacement="floating" fill="outline" type="text" placeholder="Enter username" value={username} onIonChange={e => setUsername(e.detail.value!)} />
              <IonInput label="First Name" labelPlacement="floating" fill="outline" type="text" placeholder="Enter first name" value={firstName} onIonChange={e => setFirstName(e.detail.value!)} />
              <IonInput label="Last Name" labelPlacement="floating" fill="outline" type="text" placeholder="Enter last name" value={lastName} onIonChange={e => setLastName(e.detail.value!)} />
              <IonInput label="Email" labelPlacement="floating" fill="outline" type="email" placeholder="youremail@nbsc.edu.ph" value={email} onIonChange={e => setEmail(e.detail.value!)} />
              <IonInput label="Password" labelPlacement="floating" fill="outline" type="password" placeholder="Enter password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
                <IonInputPasswordToggle slot="end" />
              </IonInput>
              <IonInput label="Confirm Password" labelPlacement="floating" fill="outline" type="password" placeholder="Confirm password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)}>
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton onClick={handleOpenVerificationModal} expand="block" shape="round">Register</IonButton>
              <IonButton routerLink="/it35-lab" expand="block" fill="clear" shape="round" className="text-sm text-green-700">
                Already have an account? <strong>Sign in</strong>
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard className="ion-padding mt-20">
              <IonCardHeader>
                <IonCardTitle>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>
                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent></IonCardContent>
              <div className="flex justify-end mr-2">
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding flex flex-col justify-center items-center h-full text-center mt-20">
            <IonTitle className="mt-20">Registration Successful 🎉</IonTitle>
            <IonText>
              <p>Your account has been created successfully.</p>
              <p>Please check your email address.</p>
            </IonText>
            <IonButton routerLink="/it35-lab" routerDirection="back" color="primary">Go to Login</IonButton>
          </IonContent>
        </IonModal>

        {/* AlertBox Component */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
