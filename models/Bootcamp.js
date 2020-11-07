const mongoose = require('mongoose');
const slugify = require('slugify');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    slug: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Name cannot exceed 500 characters']
    },
    website: {
        type: String,
        match: [
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point']
            //required: true
        },
        coordinates: {
            type: [Number],
            //required: true,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        // Array of Strings
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other',
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be atleast 1'],
        max: [10, 'Rating cannot be higher than 10']
    },
    averageCost: {
        type: Number
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGI: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

// Create bootcamp slug from name
BootcampSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);