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
    useIonRouter, 
    IonToast 
  } from '@ionic/react';
  import { useState } from 'react';
  
  const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigation = useIonRouter();
  
    const doSignup = () => {
      if (email && username && password) {
        // Simulate a successful signup process
        setShowToast(true);
        setTimeout(() => {
          // Redirect to login page after successful signup
          navigation.push('/it35-lab/Login', 'forward', 'replace');
        }, 1000);
      } else {
        // Handle form validation or errors
        alert("Please fill out all fields.");
      }
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Signup</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className='ion-padding' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
            <IonLabel position="floating">Username</IonLabel>
            <IonInput 
              type="text" 
              value={username} 
              onIonChange={e => setUsername(e.detail.value!)} 
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
  
          <IonButton onClick={doSignup} expand="full">
            Sign Up
          </IonButton>
  
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
  