import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import json

import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(ROOT_DIR, 'crop_recommendation.csv')

print("Loading dataset...")
df = pd.read_csv(dataset_path)

print(f"Dataset shape: {df.shape}")
print(f"\nFeatures: {df.columns.tolist()}")
print(f"\nTarget distribution:\n{df['label'].value_counts()}")

X = df.drop('label', axis=1)
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print("\nTraining Random Forest model...")
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=20,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"\nModel Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

feature_importance = dict(zip(X.columns, model.feature_importances_))
print("\nFeature Importance:")
for feature, importance in sorted(feature_importance.items(), key=lambda x: x[1], reverse=True):
    print(f"{feature}: {importance:.4f}")

model_path = os.path.join(ROOT_DIR, 'crop_model.pkl')
joblib.dump(model, model_path)
print(f"\nModel saved as {model_path}")

model_info = {
    'accuracy': float(accuracy),
    'n_samples': len(df),
    'n_features': len(X.columns),
    'n_classes': len(df['label'].unique()),
    'classes': sorted(df['label'].unique().tolist()),
    'feature_importance': {k: float(v) for k, v in feature_importance.items()}
}

info_path = os.path.join(ROOT_DIR, 'model_info.json')
with open(info_path, 'w') as f:
    json.dump(model_info, f, indent=2)

print(f"Model info saved as {info_path}")