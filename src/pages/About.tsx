import React, { useState, useEffect } from 'react';
import {
  IonContent, IonPage, IonItem, IonText, IonCol, IonGrid, IonRow,
  IonAvatar, IonImg, IonHeader, IonButtons, IonBackButton, IonInput, IonButton
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import { useHistory } from 'react-router-dom';

const About: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [hobbies, setHobbies] = useState('Music, Traveling, Coding, Gaming');
  const [quote, setQuote] = useState('“Life is what happens when you’re busy making other plans.” - John Lennon');
  const [additionalInfo, setAdditionalInfo] = useState('I love experimenting with new technology and enjoy working on personal projects.');
  const [isEditable, setIsEditable] = useState(false);  // To toggle between editable and non-editable mode
  const history = useHistory();

  useEffect(() => {
    const fetchSessionAndData = async () => {
      // Fetch the current session
      const { data: session, error: sessionError } = await supabase.auth.getSession();
  
      if (sessionError || !session || !session.session) {
        setAvatarPreview(null);
        return;
      }

      // Fetch user details from Supabase using the session's email
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('user_firstname, user_lastname, user_avatar_url, user_email, username')
        .eq('user_email', session.session.user.email)
        .single();

      if (userError || !user) {
        return;
      }

      // Populate state with the user details
      setFirstName(user.user_firstname || '');
      setLastName(user.user_lastname || '');
      setAvatarPreview(user.user_avatar_url);
      setEmail(user.user_email);
      setUsername(user.username || '');
    };

    fetchSessionAndData();
  }, []);

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/it35-lab/app" />
        </IonButtons>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonText color="secondary">
            <h1 style={{ fontSize: '2.5rem' }}>About Me</h1>
          </IonText>
        </IonItem>

        <IonGrid>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol className="ion-text-center">
              {/* Display current avatar */}
              {avatarPreview && (
                <IonAvatar style={{ width: '200px', height: '200px', margin: '10px auto' }}>
                  <IonImg src={avatarPreview} style={{ objectFit: 'cover' }} />
                </IonAvatar>
              )}
            </IonCol>
          </IonRow>

          {/* Display user profile details */}
          <IonRow>
            <IonCol>
              <IonText>
                <h3 style={{ fontSize: '1.5rem' }}>Username: {username}</h3>
                <h4 style={{ fontSize: '1.3rem' }}>Full Name: {firstName} {lastName}</h4>
                <h4 style={{ fontSize: '1.3rem' }}>Email: {email}</h4>
              </IonText>
            </IonCol>
          </IonRow>

          {/* Add GIF Section */}
          <IonRow>
            <IonCol>
              <IonImg 
                src="https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif" // Add your GIF URL here
                style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
              />
            </IonCol>
          </IonRow>

          {/* Editable Hobbies Section */}
          <IonRow>
            <IonCol>
              <IonText>
                <h3 style={{ fontSize: '1.5rem' }}>Hobbies</h3>
                {isEditable ? (
                  <IonInput
                    value={hobbies}
                    onIonChange={(e) => setHobbies(e.detail.value!)}
                    style={{ fontSize: '1.2rem' }}
                    placeholder="Enter your hobbies"
                  />
                ) : (
                  <p style={{ fontSize: '1.2rem' }}>{hobbies}</p>
                )}
              </IonText>
            </IonCol>
          </IonRow>

          {/* Editable Quote Section */}
          <IonRow>
            <IonCol>
              <IonText>
                <h3 style={{ fontSize: '1.5rem' }}>Favorite Quote</h3>
                {isEditable ? (
                  <IonInput
                    value={quote}
                    onIonChange={(e) => setQuote(e.detail.value!)}
                    style={{ fontSize: '1.2rem' }}
                    placeholder="Enter your favorite quote"
                  />
                ) : (
                  <p style={{ fontSize: '1.2rem' }}>{quote}</p>
                )}
              </IonText>
            </IonCol>
          </IonRow>

          {/* Editable Additional Info Section */}
          <IonRow>
            <IonCol>
              <IonText>
                <h3 style={{ fontSize: '1.5rem' }}>Additional Info</h3>
                {isEditable ? (
                  <IonInput
                    value={additionalInfo}
                    onIonChange={(e) => setAdditionalInfo(e.detail.value!)}
                    style={{ fontSize: '1.2rem' }}
                    placeholder="Enter additional info"
                  />
                ) : (
                  <p style={{ fontSize: '1.2rem' }}>{additionalInfo}</p>
                )}
              </IonText>
            </IonCol>
          </IonRow>

          {/* Toggle Edit Mode Button */}
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton onClick={toggleEditMode} expand="full" shape="round">
                {isEditable ? 'Save' : 'Edit'}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default About;
