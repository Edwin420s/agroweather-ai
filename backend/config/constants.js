// Available crops for selection
const CROPS = [
    'maize',
    'beans',
    'coffee',
    'tea',
    'wheat',
    'tomatoes',
    'potatoes'
];

// Crop-specific recommendations
const CROP_RECOMMENDATIONS = {
    maize: {
        name: 'Maize',
        ideal_conditions: {
            temp_min: 18,
            temp_max: 30,
            requires_rain: true
        },
        general_care: 'Maize requires well-drained soil and regular weeding. Monitor for fall armyworm.',
        recommendations: {
            planting_good: 'Excellent time to plant maize. The expected rain will support germination.',
            irrigation_needed: 'Dry conditions detected. Irrigate maize crops immediately.',
            disease_risk: 'High humidity may cause maize rust. Consider preventive fungicide application.',
            general: 'Apply nitrogen-rich fertilizer and monitor for pest activity.'
        }
    },
    beans: {
        name: 'Beans',
        ideal_conditions: {
            temp_min: 15,
            temp_max: 28,
            requires_rain: true
        },
        general_care: 'Beans need moderate moisture. Avoid waterlogging.',
        recommendations: {
            planting_good: 'Rainy conditions favor bean germination and growth.',
            irrigation_needed: 'Beans need consistent moisture. Consider drip irrigation.',
            disease_risk: 'Wet conditions may cause bean rust and angular leaf spot.',
            general: 'Support climbing beans. Monitor for aphids and bean flies.'
        }
    },
    coffee: {
        name: 'Coffee',
        ideal_conditions: {
            temp_min: 15,
            temp_max: 28,
            requires_rain: false
        },
        general_care: 'Coffee needs shade and consistent moisture. Prune regularly.',
        recommendations: {
            planting_good: 'Rainy conditions are excellent for coffee establishment.',
            irrigation_needed: 'Supplemental irrigation needed during dry periods.',
            disease_risk: 'Humid conditions may promote coffee berry disease.',
            general: 'Apply mulch to retain soil moisture. Monitor for leaf rust.'
        }
    },
    tea: {
        name: 'Tea',
        ideal_conditions: {
            temp_min: 10,
            temp_max: 30,
            requires_rain: true
        },
        general_care: 'Tea requires acidic soil and regular plucking. Provide shade.',
        recommendations: {
            planting_good: 'Rainy conditions ideal for tea flushing and growth.',
            irrigation_needed: 'Tea needs consistent moisture. Increase irrigation frequency.',
            disease_risk: 'High humidity may cause tea blister blight.',
            general: 'Maintain proper shade levels. Pluck regularly to encourage new growth.'
        }
    },
    wheat: {
        name: 'Wheat',
        ideal_conditions: {
            temp_min: 10,
            temp_max: 25,
            requires_rain: false
        },
        general_care: 'Wheat prefers cool conditions. Avoid waterlogging.',
        recommendations: {
            planting_good: 'Rain before planting improves wheat establishment.',
            irrigation_needed: 'Dry conditions stress wheat. Irrigate during grain filling.',
            disease_risk: 'Excess moisture may cause wheat rust and powdery mildew.',
            general: 'Apply balanced fertilizer. Watch for aphids and bird damage.'
        }
    },
    tomatoes: {
        name: 'Tomatoes',
        ideal_conditions: {
            temp_min: 18,
            temp_max: 29,
            requires_rain: false
        },
        general_care: 'Tomatoes need staking and consistent watering. Avoid overhead irrigation.',
        recommendations: {
            planting_good: 'Warm conditions with occasional rain favor tomato growth.',
            irrigation_needed: 'Drip irrigation essential during dry periods.',
            disease_risk: 'Humid conditions increase late blight risk. Apply preventive fungicide.',
            general: 'Prune suckers regularly. Monitor for hornworms and fruit borers.'
        }
    },
    potatoes: {
        name: 'Potatoes',
        ideal_conditions: {
            temp_min: 15,
            temp_max: 25,
            requires_rain: true
        },
        general_care: 'Potatoes need well-drained soil. Hill soil around plants.',
        recommendations: {
            planting_good: 'Rainy periods ideal for potato tuber initiation.',
            irrigation_needed: 'Consistent moisture critical for tuber development.',
            disease_risk: 'Wet conditions may cause potato blight. Apply fungicide.',
            general: 'Earth up around stems. Control Colorado potato beetles.'
        }
    }
};

module.exports = {
    CROPS,
    CROP_RECOMMENDATIONS
};