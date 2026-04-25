CROP_INFO = {
    'Rice': {
        'description': 'A staple grain crop grown in flooded fields, requiring warm temperatures and high humidity.',
        'season': 'Kharif (Monsoon)',
        'duration': '3-6 months',
        'fertilizer': {
            'NPK': '80-120:40-60:40-60',
            'recommendations': [
                'Apply Urea in 3 splits: basal, tillering, and panicle stage',
                'Use DAP or SSP as Phosphorus source',
                'Apply Potash (MOP) at basal stage',
                'Consider Zinc sulfate for better growth'
            ]
        },
        'price_range': '₹2,500 - ₹3,500 per quintal',
        'market_trend': 'Stable with seasonal variations',
        'best_locations': ['India', 'China', 'Indonesia', 'Bangladesh', 'Vietnam']
    },
    'Wheat': {
        'description': 'A cool-season cereal crop that thrives in moderate rainfall and temperature conditions.',
        'season': 'Rabi (Winter)',
        'duration': '4-6 months',
        'fertilizer': {
            'NPK': '70-90:40-55:40-50',
            'recommendations': [
                'Apply Urea in 2-3 splits: sowing, CRI, and tillering stage',
                'Use DAP at sowing time for Phosphorus',
                'Apply MOP before sowing',
                'Consider Sulfur for better grain quality'
            ]
        },
        'price_range': '₹2,200 - ₹2,800 per quintal',
        'market_trend': 'Stable demand globally',
        'best_locations': ['India', 'China', 'USA', 'Russia', 'Canada']
    },
    'Maize': {
        'description': 'A versatile cereal crop used for food, feed, and industrial purposes.',
        'season': 'Kharif & Rabi',
        'duration': '3-4 months',
        'fertilizer': {
            'NPK': '60-90:35-50:30-50',
            'recommendations': [
                'Apply half Nitrogen at sowing, remaining at knee-high stage',
                'Apply full Phosphorus and Potash at sowing',
                'Use Zinc sulfate if deficiency observed',
                'Consider organic manure for better soil health'
            ]
        },
        'price_range': '₹1,800 - ₹2,300 per quintal',
        'market_trend': 'Growing demand for feed and ethanol',
        'best_locations': ['USA', 'China', 'Brazil', 'Argentina', 'India']
    },
    'Cotton': {
        'description': 'A fiber crop requiring warm weather and moderate rainfall for optimal growth.',
        'season': 'Kharif',
        'duration': '5-6 months',
        'fertilizer': {
            'NPK': '100-140:40-60:40-60',
            'recommendations': [
                'Apply Nitrogen in 3 splits: basal, square formation, and flowering',
                'Apply full Phosphorus at sowing',
                'Apply Potash in 2 splits: basal and peak flowering',
                'Use Boron and Zinc micronutrients for better boll formation'
            ]
        },
        'price_range': '₹7,000 - ₹9,000 per quintal',
        'market_trend': 'Fluctuating based on textile demand',
        'best_locations': ['India', 'China', 'USA', 'Pakistan', 'Brazil']
    },
    'Jute': {
        'description': 'A natural fiber crop grown in warm, humid conditions with heavy rainfall.',
        'season': 'Kharif',
        'duration': '4-5 months',
        'fertilizer': {
            'NPK': '80-110:40-55:40-55',
            'recommendations': [
                'Apply Nitrogen in 2-3 splits',
                'Apply Phosphorus and Potash at sowing',
                'Use organic manure for better fiber quality',
                'Ensure adequate moisture throughout growth'
            ]
        },
        'price_range': '₹4,500 - ₹6,000 per quintal',
        'market_trend': 'Eco-friendly alternative demand increasing',
        'best_locations': ['India', 'Bangladesh', 'China', 'Thailand']
    },
    'Coffee': {
        'description': 'A tropical perennial crop requiring specific altitude and temperature conditions.',
        'season': 'Year-round (Harvest: Oct-Feb)',
        'duration': 'Perennial (3-4 years to first harvest)',
        'fertilizer': {
            'NPK': '80-120:30-50:30-50',
            'recommendations': [
                'Apply fertilizers in 4 splits during growing season',
                'Use organic mulch to maintain soil moisture',
                'Apply micronutrients (Zn, B, Mg) annually',
                'Maintain soil pH between 6.0-7.0'
            ]
        },
        'price_range': '₹25,000 - ₹35,000 per quintal',
        'market_trend': 'Premium specialty coffee demand growing',
        'best_locations': ['Brazil', 'Vietnam', 'Colombia', 'Indonesia', 'Ethiopia']
    },
    'Tea': {
        'description': 'A perennial evergreen shrub requiring acidic soil and high rainfall.',
        'season': 'Year-round production',
        'duration': 'Perennial (3-5 years to commercial production)',
        'fertilizer': {
            'NPK': '70-100:30-50:30-50',
            'recommendations': [
                'Apply fertilizers after each plucking round',
                'Maintain acidic soil pH (4.5-6.0)',
                'Use Sulfur to maintain soil acidity',
                'Apply micronutrients for better leaf quality'
            ]
        },
        'price_range': '₹20,000 - ₹40,000 per quintal',
        'market_trend': 'Premium tea varieties seeing growth',
        'best_locations': ['China', 'India', 'Kenya', 'Sri Lanka', 'Vietnam']
    },
    'Sugarcane': {
        'description': 'A tall perennial grass grown for sugar production in tropical regions.',
        'season': 'Year-round (12-18 month crop)',
        'duration': '12-18 months',
        'fertilizer': {
            'NPK': '100-150:40-60:60-80',
            'recommendations': [
                'Apply Nitrogen in 3 splits: planting, tillering, and grand growth',
                'Apply full Phosphorus at planting',
                'Apply Potash in 2 splits',
                'Use press mud or compost for organic matter'
            ]
        },
        'price_range': '₹300 - ₹400 per quintal (as per FRP)',
        'market_trend': 'Stable demand for sugar and ethanol',
        'best_locations': ['Brazil', 'India', 'China', 'Thailand', 'Pakistan']
    },
    'Potato': {
        'description': 'A versatile tuber crop preferring cool weather and well-drained soil.',
        'season': 'Rabi',
        'duration': '3-4 months',
        'fertilizer': {
            'NPK': '80-120:50-70:50-70',
            'recommendations': [
                'Apply half Nitrogen at planting, remaining at earthing up',
                'Apply full Phosphorus and Potash at planting',
                'Use well-decomposed FYM before planting',
                'Apply micronutrients (Zn, B) for better tuber quality'
            ]
        },
        'price_range': '₹1,200 - ₹2,000 per quintal',
        'market_trend': 'High demand, seasonal price variations',
        'best_locations': ['China', 'India', 'Russia', 'Ukraine', 'USA']
    },
    'Tomato': {
        'description': 'A warm-season vegetable crop widely grown for fresh market and processing.',
        'season': 'Year-round (climate dependent)',
        'duration': '3-4 months',
        'fertilizer': {
            'NPK': '70-100:40-60:40-60',
            'recommendations': [
                'Apply Nitrogen in splits: transplanting, flowering, fruiting',
                'Apply Phosphorus at transplanting for root development',
                'Apply Potash during flowering and fruiting',
                'Use Calcium to prevent blossom end rot'
            ]
        },
        'price_range': '₹2,000 - ₹4,500 per quintal',
        'market_trend': 'Consistent demand, seasonal peaks',
        'best_locations': ['China', 'India', 'USA', 'Turkey', 'Egypt']
    },
    'Onion': {
        'description': 'A bulb vegetable requiring moderate temperatures and well-drained soil.',
        'season': 'Rabi & Kharif',
        'duration': '4-5 months',
        'fertilizer': {
            'NPK': '60-90:40-60:40-60',
            'recommendations': [
                'Apply Nitrogen in 3 splits',
                'Apply full Phosphorus and Potash at planting',
                'Use Sulfur for better bulb development',
                'Avoid excess Nitrogen to prevent soft bulbs'
            ]
        },
        'price_range': '₹1,000 - ₹3,500 per quintal',
        'market_trend': 'Highly volatile, storage affects prices',
        'best_locations': ['China', 'India', 'USA', 'Egypt', 'Iran']
    },
    'Apple': {
        'description': 'A temperate fruit crop requiring cold winters and moderate summers.',
        'season': 'Harvest: Aug-Oct',
        'duration': 'Perennial (3-5 years to bearing)',
        'fertilizer': {
            'NPK': '20-40:125-145:200-240',
            'recommendations': [
                'High Potash requirement for fruit quality',
                'Apply Phosphorus in dormant season',
                'Split Nitrogen application during growing season',
                'Use Calcium for better fruit storage'
            ]
        },
        'price_range': '₹8,000 - ₹15,000 per quintal',
        'market_trend': 'Premium varieties commanding higher prices',
        'best_locations': ['China', 'USA', 'India', 'Turkey', 'Poland']
    },
    'Banana': {
        'description': 'A tropical fruit crop requiring warm, humid conditions and consistent moisture.',
        'season': 'Year-round',
        'duration': '10-12 months',
        'fertilizer': {
            'NPK': '80-120:70-100:40-60',
            'recommendations': [
                'High Nitrogen and Phosphorus requirement',
                'Apply fertilizers monthly',
                'Use organic mulch for moisture retention',
                'Apply micronutrients for bunch quality'
            ]
        },
        'price_range': '₹3,000 - ₹5,000 per quintal',
        'market_trend': 'Steady demand globally',
        'best_locations': ['India', 'China', 'Philippines', 'Ecuador', 'Brazil']
    },
    'Mango': {
        'description': 'A tropical fruit tree requiring warm weather and distinct seasons.',
        'season': 'Harvest: Mar-Jul',
        'duration': 'Perennial (3-5 years to bearing)',
        'fertilizer': {
            'NPK': '40-70:40-60:40-60',
            'recommendations': [
                'Apply fertilizers in 2 splits: pre-monsoon and post-harvest',
                'Use organic manure annually',
                'Apply micronutrients for better flowering',
                'Reduce Nitrogen during flowering'
            ]
        },
        'price_range': '₹4,000 - ₹10,000 per quintal',
        'market_trend': 'Premium varieties fetch higher prices',
        'best_locations': ['India', 'China', 'Thailand', 'Mexico', 'Pakistan']
    },
    'Grapes': {
        'description': 'A fruit crop requiring specific climate, high Potash, and good drainage.',
        'season': 'Harvest varies by region',
        'duration': 'Perennial (2-3 years to bearing)',
        'fertilizer': {
            'NPK': '20-40:125-145:200-240',
            'recommendations': [
                'Very high Potash requirement for fruit quality',
                'Apply Phosphorus during dormancy',
                'Split Nitrogen application',
                'Use Calcium and Magnesium for better berries'
            ]
        },
        'price_range': '₹8,000 - ₹18,000 per quintal',
        'market_trend': 'Wine and table grapes both in demand',
        'best_locations': ['China', 'Italy', 'USA', 'Spain', 'France']
    },
    'Orange': {
        'description': 'A citrus fruit tree requiring subtropical climate and moderate rainfall.',
        'season': 'Harvest: Nov-Mar',
        'duration': 'Perennial (3-4 years to bearing)',
        'fertilizer': {
            'NPK': '20-30:10-20:10-20',
            'recommendations': [
                'Apply fertilizers in 3 splits during growing season',
                'Use micronutrients (Zn, Mn, Fe) for citrus health',
                'Maintain soil pH 6.0-7.5',
                'Apply organic matter annually'
            ]
        },
        'price_range': '₹3,500 - ₹6,500 per quintal',
        'market_trend': 'Juice and fresh consumption demand stable',
        'best_locations': ['Brazil', 'USA', 'China', 'India', 'Mexico']
    },
    'Watermelon': {
        'description': 'A warm-season fruit crop requiring hot weather and adequate moisture.',
        'season': 'Summer',
        'duration': '3-4 months',
        'fertilizer': {
            'NPK': '80-120:40-60:40-60',
            'recommendations': [
                'Apply Nitrogen in splits: planting, vine growth, fruiting',
                'Apply Phosphorus at planting',
                'Apply Potash during fruit development',
                'Use Calcium to prevent fruit disorders'
            ]
        },
        'price_range': '₹800 - ₹2,000 per quintal',
        'market_trend': 'Seasonal demand in summer',
        'best_locations': ['China', 'Turkey', 'Iran', 'Brazil', 'Egypt']
    },
    'Papaya': {
        'description': 'A tropical fruit crop requiring warm temperatures and consistent moisture.',
        'season': 'Year-round',
        'duration': '8-12 months to first fruit',
        'fertilizer': {
            'NPK': '50-80:40-60:40-60',
            'recommendations': [
                'Apply fertilizers monthly',
                'High Nitrogen requirement during vegetative phase',
                'Increase Potash during fruiting',
                'Use micronutrients for better fruit quality'
            ]
        },
        'price_range': '₹2,500 - ₹5,000 per quintal',
        'market_trend': 'Growing demand for health benefits',
        'best_locations': ['India', 'Brazil', 'Mexico', 'Indonesia', 'Nigeria']
    },
    'Coconut': {
        'description': 'A tropical palm requiring coastal climate, high humidity, and rainfall.',
        'season': 'Year-round production',
        'duration': 'Perennial (5-7 years to bearing)',
        'fertilizer': {
            'NPK': '20-30:10-20:10-30',
            'recommendations': [
                'Apply fertilizers in 2 splits per year',
                'Use organic manure and green manure',
                'Apply common salt (2-3 kg/tree/year) near coast',
                'Use micronutrients for nut quality'
            ]
        },
        'price_range': '₹25,000 - ₹45,000 per 1000 nuts',
        'market_trend': 'Rising demand for coconut products',
        'best_locations': ['Indonesia', 'Philippines', 'India', 'Brazil', 'Sri Lanka']
    },
    'Chickpea': {
        'description': 'A pulse crop tolerating dry conditions, fixing nitrogen in soil.',
        'season': 'Rabi',
        'duration': '4-5 months',
        'fertilizer': {
            'NPK': '40-60:60-80:80-100',
            'recommendations': [
                'Low Nitrogen (fixes its own nitrogen)',
                'High Phosphorus and Potash requirement',
                'Apply Sulfur for better nodulation',
                'Use Rhizobium culture for nitrogen fixation'
            ]
        },
        'price_range': '₹5,000 - ₹7,500 per quintal',
        'market_trend': 'Protein demand driving growth',
        'best_locations': ['India', 'Australia', 'Pakistan', 'Turkey', 'Myanmar']
    },
    'Lentil': {
        'description': 'A cool-season pulse crop with low water requirement.',
        'season': 'Rabi',
        'duration': '3-4 months',
        'fertilizer': {
            'NPK': '20-40:60-80:20-40',
            'recommendations': [
                'Minimal Nitrogen (nitrogen-fixing crop)',
                'Moderate Phosphorus for root development',
                'Apply Sulfur for better nodulation',
                'Use Rhizobium inoculation at sowing'
            ]
        },
        'price_range': '₹6,000 - ₹9,000 per quintal',
        'market_trend': 'Plant-based protein trend beneficial',
        'best_locations': ['Canada', 'India', 'Turkey', 'USA', 'Australia']
    },
    'Soybean': {
        'description': 'An oilseed and protein crop fixing atmospheric nitrogen.',
        'season': 'Kharif',
        'duration': '3-4 months',
        'fertilizer': {
            'NPK': '40-60:60-80:70-90',
            'recommendations': [
                'Moderate Nitrogen requirement',
                'High Phosphorus and Potash need',
                'Use Rhizobium inoculation for nitrogen fixation',
                'Apply Sulfur for better oil content'
            ]
        },
        'price_range': '₹3,500 - ₹4,800 per quintal',
        'market_trend': 'Strong demand for oil and feed',
        'best_locations': ['USA', 'Brazil', 'Argentina', 'China', 'India']
    }
}