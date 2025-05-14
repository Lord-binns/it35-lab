import React, { useState } from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButton } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';

const CleanEarthFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState<{ title: string; img: string; liked: boolean }[]>([
    { title: 'Recycling for a Greener Future', img: 'https://i.pinimg.com/originals/8d/a4/3c/8da43c86a7c3546afe9d20336c09ff2c.gif', liked: false },
    { title: 'Tree Planting Initiative', img: 'https://i.pinimg.com/originals/18/42/81/184281f0fe87517a950beb8112c308dd.gif', liked: false },
    { title: 'Clean Energy Revolution', img: 'https://i.pinimg.com/originals/93/85/ae/9385aefadd2d6b0cafa6d95e47f87e32.gif', liked: false }
  ]);

  const toggleLike = (index: number) => {
    setFavorites(prev => prev.map((item, i) => (i === index ? { ...item, liked: !item.liked } : item)));
  };

  return (
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          {favorites.map((item, index) => (
            <IonCol size="12" sizeMd="4" key={index}>
              <IonCard>
                <IonImg src={item.img} alt={item.title} />
                <IonCardContent className="text-center">
                  <IonText>{item.title}</IonText>
                  <IonButton fill="clear" onClick={() => toggleLike(index)}>
                    <IonIcon icon={item.liked ? heart : heartOutline} color={item.liked ? 'success' : 'medium'} />
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default CleanEarthFavorites;
