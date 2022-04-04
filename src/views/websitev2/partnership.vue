<template>
  <div>
    <div class="main-container">
      <section
        class="imagebg text-center"
        data-gradient-bg="#000000,#22020D,#1C0B2D,#33195D"
      >
        <div class="background-image-holder" style="padding-top: 100px">
          <img
            alt="ecio coming soon"
            src="../../assets/images/bg-coming-soon.jpg"
          />
        </div>
        <div style="padding: 15px">
          <h1 class="coming mb-3">partnership form</h1>
          <p>
            Please provide all required details and we will be in touch shortly.
          </p>

          <div
            id="mauticform_wrapper_partnershipform"
            class="mauticform_wrapper"
          >
            <form
              autocomplete="false"
              role="form"
              method="post"
              action="https://mt.ecio.space/form/submit?formId=3"
              id="mauticform_partnershipform"
              data-mautic-form="partnershipform"
              enctype="multipart/form-data"
            >
              <div
                class="mauticform-error"
                id="mauticform_partnershipform_error"
              ></div>
              <div
                class="mauticform-message"
                id="mauticform_partnershipform_message"
              ></div>
              <div class="mauticform-innerform">
                <div
                  class="mauticform-page-wrapper mauticform-page-1"
                  data-mautic-form-page="1"
                >
                  <div
                    id="mauticform_partnershipform_business_name"
                    data-validate="business_name"
                    data-validation-type="text"
                    class="mauticform-row mauticform-text mauticform-field-1 mauticform-required"
                  >
                    <label
                      id="mauticform_label_partnershipform_business_name"
                      for="mauticform_input_partnershipform_business_name"
                      class="mauticform-label"
                      >Business Name</label
                    >
                    <input
                      id="mauticform_input_partnershipform_business_name"
                      name="mauticform[business_name]"
                      value=""
                      class="mauticform-input"
                      type="text"
                    />
                    <span class="mauticform-errormsg" style="display: none"
                      >This is required.</span
                    >
                  </div>

                  <div
                    id="mauticform_partnershipform_website"
                    data-validate="website"
                    data-validation-type="text"
                    class="mauticform-row mauticform-text mauticform-field-2 mauticform-required"
                  >
                    <label
                      id="mauticform_label_partnershipform_website"
                      for="mauticform_input_partnershipform_website"
                      class="mauticform-label"
                      >Website</label
                    >
                    <input
                      id="mauticform_input_partnershipform_website"
                      name="mauticform[website]"
                      value=""
                      class="mauticform-input"
                      type="text"
                    />
                    <span class="mauticform-errormsg" style="display: none"
                      >This is required.</span
                    >
                  </div>

                  <div
                    id="mauticform_partnershipform_first_name"
                    data-validate="first_name"
                    data-validation-type="text"
                    class="mauticform-row mauticform-text mauticform-field-3 mauticform-required"
                  >
                    <label
                      id="mauticform_label_partnershipform_first_name"
                      for="mauticform_input_partnershipform_first_name"
                      class="mauticform-label"
                      >First Name</label
                    >
                    <input
                      id="mauticform_input_partnershipform_first_name"
                      name="mauticform[first_name]"
                      value=""
                      class="mauticform-input"
                      type="text"
                    />
                    <span class="mauticform-errormsg" style="display: none"
                      >This is required.</span
                    >
                  </div>

                  <div
                    id="mauticform_partnershipform_last_name"
                    data-validate="last_name"
                    data-validation-type="text"
                    class="mauticform-row mauticform-text mauticform-field-4 mauticform-required"
                  >
                    <label
                      id="mauticform_label_partnershipform_last_name"
                      for="mauticform_input_partnershipform_last_name"
                      class="mauticform-label"
                      >Last Name</label
                    >
                    <input
                      id="mauticform_input_partnershipform_last_name"
                      name="mauticform[last_name]"
                      value=""
                      class="mauticform-input"
                      type="text"
                    />
                    <span class="mauticform-errormsg" style="display: none"
                      >This is required.</span
                    >
                  </div>

                  <div
                    id="mauticform_partnershipform_contact_email"
                    data-validate="contact_email"
                    data-validation-type="email"
                    class="mauticform-row mauticform-email mauticform-field-5 mauticform-required"
                  >
                    <label
                      id="mauticform_label_partnershipform_contact_email"
                      for="mauticform_input_partnershipform_contact_email"
                      class="mauticform-label"
                      >Contact Email</label
                    >
                    <input
                      id="mauticform_input_partnershipform_contact_email"
                      name="mauticform[contact_email]"
                      value=""
                      class="mauticform-input"
                      type="email"
                    />
                    <span class="mauticform-errormsg" style="display: none"
                      >This is required.</span
                    >
                  </div>

                  <div
                    id="mauticform_partnershipform_type_of_partnership"
                    data-validate="type_of_partnership"
                    data-validation-type="select"
                    class="mauticform-row mauticform-select mauticform-field-6 mauticform-required"
                  >
                    <label
                      id="mauticform_label_partnershipform_type_of_partnership"
                      for="mauticform_input_partnershipform_type_of_partnership"
                      class="mauticform-label"
                      >Type of Partnership</label
                    >
                    <select
                      v-model="partnerShipt"
                      id="mauticform_input_partnershipform_type_of_partnership"
                      name="mauticform[type_of_partnership]"
                      value=""
                      class="mauticform-selectbox"
                    >
                      <option value=""></option>
                      <option value="Platform Partnership">
                        Platform Partnership
                      </option>
                      <option value="Camping Collaboration">
                        Camping Collaboration
                      </option>
                      <option value="News &amp; Media">News &amp; Media</option>
                      <option value="Investment">Investment</option>
                      <option value="Others, please specify below.">
                        Others, please specify below.
                      </option>
                    </select>
                    <span class="mauticform-errormsg" style="display: none"
                      >This is required.</span
                    >
                  </div>

                  <div
                    v-if="partnerShipt === 'Others, please specify below.'"
                    id="mauticform_partnershipform_other_type_of_partnership"
                    class="mauticform-row mauticform-text mauticform-field-7"
                  >
                    <label
                      id="mauticform_label_partnershipform_other_type_of_partnership"
                      for="mauticform_input_partnershipform_other_type_of_partnership"
                      class="mauticform-label"
                      >Other type of partnershipt</label
                    >
                    <input
                      id="mauticform_input_partnershipform_other_type_of_partnership"
                      name="mauticform[other_type_of_partnership]"
                      value=""
                      class="mauticform-input"
                      type="text"
                    />
                    <span
                      class="mauticform-errormsg"
                      style="display: none"
                    ></span>
                  </div>

                  <div
                    id="mauticform_partnershipform_telegram"
                    data-validate="telegram"
                    data-validation-type="text"
                    class="mauticform-row mauticform-text mauticform-field-7 mauticform-required"
                  >
                    <label
                      id="mauticform_label_partnershipform_telegram"
                      for="mauticform_input_partnershipform_telegram"
                      class="mauticform-label"
                      >Telegram</label
                    >
                    <input
                      id="mauticform_input_partnershipform_telegram"
                      name="mauticform[telegram]"
                      value=""
                      class="mauticform-input"
                      type="text"
                    />
                    <span class="mauticform-errormsg" style="display: none"
                      >This is required.</span
                    >
                  </div>

                  <div
                    id="mauticform_partnershipform_whatapp"
                    class="mauticform-row mauticform-text mauticform-field-8"
                  >
                    <label
                      id="mauticform_label_partnershipform_whatapp"
                      for="mauticform_input_partnershipform_whatapp"
                      class="mauticform-label"
                      >Whatapp</label
                    >
                    <input
                      id="mauticform_input_partnershipform_whatapp"
                      name="mauticform[whatapp]"
                      value=""
                      class="mauticform-input"
                      type="text"
                    />
                    <span
                      class="mauticform-errormsg"
                      style="display: none"
                    ></span>
                  </div>

                  <div
                    id="mauticform_partnershipform_tell_us_more_about_how_we"
                    class="mauticform-row mauticform-text mauticform-field-9"
                  >
                    <label
                      id="mauticform_label_partnershipform_tell_us_more_about_how_we"
                      for="mauticform_input_partnershipform_tell_us_more_about_how_we"
                      class="mauticform-label"
                      >Tell us more about how we can collaborate</label
                    >
                    <textarea
                      id="mauticform_input_partnershipform_tell_us_more_about_how_we"
                      name="mauticform[tell_us_more_about_how_we]"
                      class="mauticform-textarea"
                    ></textarea>
                    <span
                      class="mauticform-errormsg"
                      style="display: none"
                    ></span>
                  </div>

                  <div
                    id="mauticform_partnershipform_submit"
                    class="mauticform-row partnership mauticform-button-wrapper mauticform-field-10"
                  >
                    <label class="mauticform-label"></label>
                    <button
                      type="submit"
                      name="mauticform[submit]"
                      id="mauticform_input_partnershipform_submit"
                      value=""
                      class="mauticform-button btn btn-default"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              <input
                type="hidden"
                name="mauticform[formId]"
                id="mauticform_partnershipform_id"
                value="3"
              />
              <input
                type="hidden"
                name="mauticform[return]"
                id="mauticform_partnershipform_return"
                value=""
              />
              <input
                type="hidden"
                name="mauticform[formName]"
                id="mauticform_partnershipform_name"
                value="partnershipform"
              />
            </form>
          </div>

          <!-- <div>
                <div class="form-group flex">
                  <h2>Business name <span>*</span></h2>
                  <input type="text" name="Name" class="validate-required" />
                </div>

                <div class="form-group flex">
                  <h2>Website <span>*</span></h2>
                  <input type="text" name="Name" class="validate-required" />
                </div>

                <div class="form-group flex">
                  <h2>Contact Person <span>*</span></h2>
                  <input type="text" name="Name" class="validate-required" />
                </div>

                <div class="form-group flex">
                  <h2>Contact Email <span>*</span></h2>
                  <input type="text" name="Name" class="validate-required" />
                </div>

                <div class="form-group flex">
                  <h2>Type of Partnership <span>*</span></h2>
                  <input type="text" name="Name" class="validate-required" />
                </div>

                <div class="form-group flex">
                  <h2>Telegram <span>*</span></h2>
                  <input type="text" name="Name" class="validate-required" />
                </div>

                <div class="form-group flex">
                  <h2>Whatapp</h2>
                  <input type="text" name="Name" class="validate-required" />
                </div>

                <div class="form-group flex">
                  <h2>Tell us more about how we can collaborate</h2>
                  <input type="text" name="Name" class="validate-required" />
                </div>
              </div> -->

          <!--end modal instance-->

          <!--end of row-->
        </div>
        <!--end of container-->
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partnerShipt: "",
    };
  },
};
</script>

<style>
h1.coming {
  font-size: 3rem;
  color: #ddfb15 !important;
  text-transform: uppercase;
}
.form-group {
  max-width: 600px;
  margin: auto;
  margin-top: 40px;
}
.form-group h2 {
  width: 220px;
  font-size: 1.2rem;
}

.mauticform_wrapper {
  max-width: 600px;
  margin: 10px auto;
}
.mauticform-innerform {
}
.mauticform-post-success {
}
.mauticform-name {
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 3px;
}
.mauticform-description {
  margin-top: 2px;
  margin-bottom: 10px;
}
.mauticform-error {
  margin-bottom: 10px;
  color: red;
}
.mauticform-message {
  margin-bottom: 10px;
  color: green;
}
.mauticform-row {
  display: block;
  margin-bottom: 20px;
}
.mauticform-label {
  font-size: 1.1em;
  display: block;
  width: 220px !important;
  margin-bottom: 5px;
  text-align: left;
}
.mauticform-row.mauticform-required .mauticform-label:after {
  color: #e32;
  content: " *";
  display: inline;
}
.mauticform-helpmessage {
  display: block;
  font-size: 0.9em;
  margin-bottom: 3px;
}
.mauticform-errormsg {
  display: none !important;
  color: red;
  margin-top: 2px;
}
.mauticform-selectbox,
.mauticform-input,
.mauticform-textarea {
  width: 100%;
  padding: 0.5em 0.5em;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0px 0px 0px #fff inset;
  border-radius: 4px;
  box-sizing: border-box;
}
.mauticform-checkboxgrp-row {
}
.mauticform-checkboxgrp-label {
  font-weight: normal;
}
.mauticform-checkboxgrp-checkbox {
}
.mauticform-radiogrp-row {
}
.mauticform-radiogrp-label {
  font-weight: normal;
}
.mauticform-radiogrp-radio {
}
.mauticform-button-wrapper .mauticform-button.btn-default,
.mauticform-pagebreak-wrapper .mauticform-pagebreak.btn-default {
  color: #5d6c7c;
  background-color: #ffffff;
  border-color: #dddddd;
}
.mauticform-button-wrapper .mauticform-button,
.mauticform-pagebreak-wrapper .mauticform-pagebreak {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.3856;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.mauticform-button-wrapper .mauticform-button.btn-default[disabled],
.mauticform-pagebreak-wrapper .mauticform-pagebreak.btn-default[disabled] {
  background-color: #ffffff;
  border-color: #dddddd;
  opacity: 0.75;
  cursor: not-allowed;
}
.mauticform-pagebreak-wrapper .mauticform-button-wrapper {
  display: inline;
}
.partnership.mauticform-button-wrapper .mauticform-button.btn-default {
  background: #ddfb14 !important;
  font-size: 1.1rem;
}
#mauticform_partnershipform_submit {
  max-width: 200px;
  margin: auto;
}
</style>
