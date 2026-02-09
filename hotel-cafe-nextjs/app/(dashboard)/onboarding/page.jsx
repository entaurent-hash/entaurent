'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/dashboard/Header';
import '@/app/styles/onboarding.css';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    restaurantType: 'restaurant',
    cuisineType: '',
    noOfTables: 0,
    location: '',
    city: '',
    country: 'India'
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      router.push('/dashboard');
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <Header 
        title="Setup Your Restaurant" 
        subtitle="Complete onboarding to start using EntaurentQR" 
      />
      
      <div className="onboarding-container">
        <div className="onboarding-progress">
          <div className="progress-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${step > 1 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-line ${step > 2 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>
        </div>

        <div className="onboarding-card">
          {step === 1 && (
            <div>
              <h3>Business Type</h3>
              <p>What type of establishment is this?</p>
              
              <div className="radio-group">
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="type"
                    value="restaurant"
                    checked={formData.restaurantType === 'restaurant'}
                    onChange={(e) => setFormData({...formData, restaurantType: e.target.value})}
                  />
                  <span className="radio-icon">🍽️</span>
                  <span>Restaurant</span>
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="type"
                    value="cafe"
                    checked={formData.restaurantType === 'cafe'}
                    onChange={(e) => setFormData({...formData, restaurantType: e.target.value})}
                  />
                  <span className="radio-icon">☕</span>
                  <span>Café</span>
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="type"
                    value="hotel"
                    checked={formData.restaurantType === 'hotel'}
                    onChange={(e) => setFormData({...formData, restaurantType: e.target.value})}
                  />
                  <span className="radio-icon">🏨</span>
                  <span>Hotel</span>
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="type"
                    value="bar"
                    checked={formData.restaurantType === 'bar'}
                    onChange={(e) => setFormData({...formData, restaurantType: e.target.value})}
                  />
                  <span className="radio-icon">🍺</span>
                  <span>Bar/Pub</span>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3>Business Details</h3>
              
              <div className="form-group">
                <label>Cuisine Type</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={formData.cuisineType}
                  onChange={(e) => setFormData({...formData, cuisineType: e.target.value})}
                  placeholder="e.g., Italian, Indian, Fast Food"
                />
              </div>

              <div className="form-group">
                <label>Number of Tables</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={formData.noOfTables}
                  onChange={(e) => setFormData({...formData, noOfTables: parseInt(e.target.value)})}
                  placeholder="e.g., 20"
                />
              </div>

              <div className="form-group">
                <label>Location/Address</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Street address"
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="City name"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3>Review Your Setup</h3>
              <p>Please review your information before completing setup</p>

              <div className="review-card">
                <div className="review-item">
                  <label>Type:</label>
                  <span>{formData.restaurantType.charAt(0).toUpperCase() + formData.restaurantType.slice(1)}</span>
                </div>
                <div className="review-item">
                  <label>Cuisine:</label>
                  <span>{formData.cuisineType || 'Not specified'}</span>
                </div>
                <div className="review-item">
                  <label>Tables:</label>
                  <span>{formData.noOfTables}</span>
                </div>
                <div className="review-item">
                  <label>Location:</label>
                  <span>{formData.location}, {formData.city}</span>
                </div>
              </div>
            </div>
          )}

          <div className="onboarding-actions">
            <button 
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={step === 1}
            >
              Previous
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleNext}
            >
              {step === 3 ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
