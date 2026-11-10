const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    /* ================= IMAGE / VIDEO ================= */
    media_type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    image: {
      type: String,
      default: null,
    },

    certificate: {
      type: Boolean,
      default: false,
    },

    allowPlaylistAccess: {
      type: Boolean,
      default: false,
    },

    /* ================= BUNNY VIDEO ================= */

    // Bunny Stream Library ID
    lib_id: {
      type: String,
      default: null,
      trim: true,
    },

    video_url: {
      type: String,
      default: null,
    },

    /* ================= TITLE ================= */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    /* ================= SLUG ================= */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    /* ================= CATEGORY ================= */
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    /* ================= PREMIUM ================= */
    premium: {
      type: Boolean,
      default: true, // true = paid, false = free
    },

    /* ================= PRICE ================= */
    price: {
      type: Number,
      default: 0,
    },

    discount_price: {
      type: Number,
      default: 0,
    },

    /* ================= SEO ================= */
    meta_keyword: {
      type: [String],
      default: [],
    },

    /* ================= DESCRIPTION ================= */
    short_description: {
      type: String,
      required: true,
    },

    referral_commission: {
      type: Number,
      default: 0, // percentage
      min: 0,
      max: 100,
    },

    description: {
      type: String,
      required: true,
    },

    /* ================= LANGUAGE ================= */
    language: {
      type: String,
      enum: ["English", "Hindi"],
      required: true,
    },

    /* ================= LEARNS ================= */
    learns: {
      type: [String],
      default: [],
    },

    /* ================= INCLUDES ================= */
    includes: [
      {
        icon: {
          type: String,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],

    /* ================= STATUS ================= */
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* ======================================================
   🔥 AUTO SLUG GENERATOR (UNIQUE)
====================================================== */
courseSchema.pre("validate", async function () {
  if (!this.isModified("title")) return;

  const baseSlug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let slug = baseSlug;
  let counter = 1;

  while (await mongoose.models.Course.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  this.slug = slug;
});

module.exports = mongoose.model("Course", courseSchema);