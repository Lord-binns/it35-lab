import { 
    IonButton, 
    IonContent, 
    IonHeader, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonAvatar, 
    IonIcon, 
    IonToast, 
    useIonRouter 
  } from '@ionic/react';
  import { useState } from 'react';
  import { logoApple } from 'ionicons/icons';
  
  const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigation = useIonRouter();
  
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
  
    const handleContinue = () => {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      setShowToast(true);
  
      // Directly navigate to the login page after successful signup
      navigation.push('/it35-lab/', 'forward', 'replace');
      closeModal(); // Close the modal after the navigation
    };
  
    const handleCancel = () => closeModal();
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sign Up</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className='ion-padding' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <IonAvatar style={{ width: "150px", height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <IonIcon icon={logoApple} style={{ fontSize: "100px" }} />
          </IonAvatar>
  
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput 
              type="email" 
              value={email} 
              onIonChange={e => setEmail(e.detail.value!)} 
              required 
            />
          </IonItem>
  
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput 
              type="password" 
              value={password} 
              onIonChange={e => setPassword(e.detail.value!)} 
              required 
            />
          </IonItem>
  
          <IonItem>
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput 
              type="password" 
              value={confirmPassword} 
              onIonChange={e => setConfirmPassword(e.detail.value!)} 
              required 
            />
          </IonItem>
  
          <IonButton onClick={openModal} expand="full" style={{ marginTop: '20px' }}>
            Create New Account
          </IonButton>
  
          {modalIsOpen && (
            <div className="modal" style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              position: 'fixed', 
              top: '0', 
              left: '0', 
              right: '0', 
              bottom: '0', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              zIndex: 9999 
            }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '80%', maxWidth: '400px' }}>
                <h2>Continue Creating Account?</h2>
                <IonButton onClick={handleContinue} expand="block" color="success" style={{ marginBottom: '10px' }}>
                  Yes, Continue
                </IonButton>
                <IonButton onClick={handleCancel} expand="block" color="danger">
                  No, Cancel
                </IonButton>
              </div>
            </div>
          )}
  
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            duration={1000}
            message="Signup Successful! Redirecting..."
            position="top"
          />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Signup;
  