import pandas as pd
import numpy as np
import random

np.random.seed(42)
random.seed(42)

crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Jute', 'Coffee', 'Tea', 'Sugarcane', 
         'Potato', 'Tomato', 'Onion', 'Apple', 'Banana', 'Mango', 'Grapes', 
         'Orange', 'Watermelon', 'Papaya', 'Coconut', 'Chickpea', 'Lentil', 'Soybean']

data = []

for _ in range(2200):
    crop = random.choice(crops)
    
    if crop == 'Rice':
        N = np.random.uniform(80, 120)
        P = np.random.uniform(40, 60)
        K = np.random.uniform(40, 60)
        temperature = np.random.uniform(20, 27)
        humidity = np.random.uniform(80, 90)
        ph = np.random.uniform(5.5, 7.0)
        rainfall = np.random.uniform(150, 300)
    elif crop == 'Wheat':
        N = np.random.uniform(70, 90)
        P = np.random.uniform(40, 55)
        K = np.random.uniform(40, 50)
        temperature = np.random.uniform(12, 20)
        humidity = np.random.uniform(50, 70)
        ph = np.random.uniform(6.0, 7.5)
        rainfall = np.random.uniform(50, 100)
    elif crop == 'Maize':
        N = np.random.uniform(60, 90)
        P = np.random.uniform(35, 50)
        K = np.random.uniform(30, 50)
        temperature = np.random.uniform(18, 27)
        humidity = np.random.uniform(55, 75)
        ph = np.random.uniform(5.5, 7.0)
        rainfall = np.random.uniform(60, 110)
    elif crop == 'Cotton':
        N = np.random.uniform(100, 140)
        P = np.random.uniform(40, 60)
        K = np.random.uniform(40, 60)
        temperature = np.random.uniform(21, 30)
        humidity = np.random.uniform(50, 80)
        ph = np.random.uniform(6.0, 7.5)
        rainfall = np.random.uniform(60, 120)
    elif crop == 'Jute':
        N = np.random.uniform(80, 110)
        P = np.random.uniform(40, 55)
        K = np.random.uniform(40, 55)
        temperature = np.random.uniform(24, 32)
        humidity = np.random.uniform(70, 90)
        ph = np.random.uniform(6.0, 7.0)
        rainfall = np.random.uniform(150, 250)
    elif crop == 'Coffee':
        N = np.random.uniform(80, 120)
        P = np.random.uniform(30, 50)
        K = np.random.uniform(30, 50)
        temperature = np.random.uniform(15, 24)
        humidity = np.random.uniform(60, 80)
        ph = np.random.uniform(6.0, 7.0)
        rainfall = np.random.uniform(150, 250)
    elif crop == 'Tea':
        N = np.random.uniform(70, 100)
        P = np.random.uniform(30, 50)
        K = np.random.uniform(30, 50)
        temperature = np.random.uniform(10, 25)
        humidity = np.random.uniform(70, 90)
        ph = np.random.uniform(4.5, 6.0)
        rainfall = np.random.uniform(150, 300)
    elif crop == 'Sugarcane':
        N = np.random.uniform(100, 150)
        P = np.random.uniform(40, 60)
        K = np.random.uniform(60, 80)
        temperature = np.random.uniform(20, 30)
        humidity = np.random.uniform(70, 90)
        ph = np.random.uniform(6.0, 7.5)
        rainfall = np.random.uniform(100, 200)
    elif crop == 'Potato':
        N = np.random.uniform(80, 120)
        P = np.random.uniform(50, 70)
        K = np.random.uniform(50, 70)
        temperature = np.random.uniform(15, 20)
        humidity = np.random.uniform(60, 80)
        ph = np.random.uniform(5.5, 6.5)
        rainfall = np.random.uniform(80, 150)
    elif crop == 'Tomato':
        N = np.random.uniform(70, 100)
        P = np.random.uniform(40, 60)
        K = np.random.uniform(40, 60)
        temperature = np.random.uniform(18, 27)
        humidity = np.random.uniform(60, 85)
        ph = np.random.uniform(6.0, 7.0)
        rainfall = np.random.uniform(60, 120)
    elif crop == 'Onion':
        N = np.random.uniform(60, 90)
        P = np.random.uniform(40, 60)
        K = np.random.uniform(40, 60)
        temperature = np.random.uniform(15, 25)
        humidity = np.random.uniform(50, 70)
        ph = np.random.uniform(6.0, 7.0)
        rainfall = np.random.uniform(50, 100)
    elif crop == 'Apple':
        N = np.random.uniform(20, 40)
        P = np.random.uniform(125, 145)
        K = np.random.uniform(200, 240)
        temperature = np.random.uniform(5, 20)
        humidity = np.random.uniform(60, 80)
        ph = np.random.uniform(5.5, 7.0)
        rainfall = np.random.uniform(100, 200)
    elif crop == 'Banana':
        N = np.random.uniform(80, 120)
        P = np.random.uniform(70, 100)
        K = np.random.uniform(40, 60)
        temperature = np.random.uniform(25, 32)
        humidity = np.random.uniform(75, 95)
        ph = np.random.uniform(5.5, 7.0)
        rainfall = np.random.uniform(100, 200)
    elif crop == 'Mango':
        N = np.random.uniform(40, 70)
        P = np.random.uniform(40, 60)
        K = np.random.uniform(40, 60)
        temperature = np.random.uniform(24, 32)
        humidity = np.random.uniform(50, 75)
        ph = np.random.uniform(5.5, 7.5)
        rainfall = np.random.uniform(70, 150)
    elif crop == 'Grapes':
        N = np.random.uniform(20, 40)
        P = np.random.uniform(125, 145)
        K = np.random.uniform(200, 240)
        temperature = np.random.uniform(15, 25)
        humidity = np.random.uniform(60, 80)
        ph = np.random.uniform(5.5, 7.0)
        rainfall = np.random.uniform(50, 100)
    elif crop == 'Orange':
        N = np.random.uniform(20, 30)
        P = np.random.uniform(10, 20)
        K = np.random.uniform(10, 20)
        temperature = np.random.uniform(15, 30)
        humidity = np.random.uniform(60, 80)
        ph = np.random.uniform(6.0, 7.5)
        rainfall = np.random.uniform(100, 200)
    elif crop == 'Watermelon':
        N = np.random.uniform(80, 120)
        P = np.random.uniform(40, 60)
        K = np.random.uniform(40, 60)
        temperature = np.random.uniform(24, 32)
        humidity = np.random.uniform(60, 80)
        ph = np.random.uniform(6.0, 7.0)
        rainfall = np.random.uniform(40, 80)
    elif crop == 'Papaya':
        N = np.random.uniform(50, 80)
        P = np.random.uniform(40, 60)
        K = np.random.uniform(40, 60)
        temperature = np.random.uniform(25, 35)
        humidity = np.random.uniform(60, 90)
        ph = np.random.uniform(6.0, 7.0)
        rainfall = np.random.uniform(100, 200)
    elif crop == 'Coconut':
        N = np.random.uniform(20, 30)
        P = np.random.uniform(10, 20)
        K = np.random.uniform(10, 30)
        temperature = np.random.uniform(25, 32)
        humidity = np.random.uniform(70, 90)
        ph = np.random.uniform(5.5, 7.0)
        rainfall = np.random.uniform(150, 250)
    elif crop == 'Chickpea':
        N = np.random.uniform(40, 60)
        P = np.random.uniform(60, 80)
        K = np.random.uniform(80, 100)
        temperature = np.random.uniform(18, 25)
        humidity = np.random.uniform(40, 60)
        ph = np.random.uniform(6.0, 7.5)
        rainfall = np.random.uniform(40, 80)
    elif crop == 'Lentil':
        N = np.random.uniform(20, 40)
        P = np.random.uniform(60, 80)
        K = np.random.uniform(20, 40)
        temperature = np.random.uniform(15, 25)
        humidity = np.random.uniform(40, 60)
        ph = np.random.uniform(6.0, 7.0)
        rainfall = np.random.uniform(40, 80)
    else:  # Soybean
        N = np.random.uniform(40, 60)
        P = np.random.uniform(60, 80)
        K = np.random.uniform(70, 90)
        temperature = np.random.uniform(20, 30)
        humidity = np.random.uniform(60, 80)
        ph = np.random.uniform(6.0, 7.5)
        rainfall = np.random.uniform(60, 120)
    
    data.append({
        'N': round(N, 2),
        'P': round(P, 2),
        'K': round(K, 2),
        'temperature': round(temperature, 2),
        'humidity': round(humidity, 2),
        'ph': round(ph, 2),
        'rainfall': round(rainfall, 2),
        'label': crop
    })

import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(ROOT_DIR, 'crop_recommendation.csv')

df = pd.DataFrame(data)
df = df.sample(frac=1, random_state=42).reset_index(drop=True)
df.to_csv(output_path, index=False)
print(f"Dataset generated with {len(df)} samples at {output_path}")
print(f"\nCrop distribution:")
print(df['label'].value_counts())