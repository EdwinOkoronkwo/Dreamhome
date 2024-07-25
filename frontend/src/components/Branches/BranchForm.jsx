// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function BranchForm({ onSubmit, inputData, children }) {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();

//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     if (selectedImage) {
//       formData.append("image", selectedImage);
//     }
//     onSubmit(formData);
//   }

//   return (
//     <form id="branch-form" onSubmit={handleSubmit}>
//       <p className="control">
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           required
//           defaultValue={inputData?.branchno ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="street">Street</label>
//         <input
//           type="text"
//           id="street"
//           name="street"
//           required
//           defaultValue={inputData?.street ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="city">City</label>
//         <input
//           type="text"
//           id="city"
//           name="city"
//           required
//           defaultValue={inputData?.city ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="postcode">Postcode</label>
//         <input
//           type="text"
//           id="postcode"
//           name="postcode"
//           required
//           defaultValue={inputData?.postcode ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="image">Image</label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={(event) => setSelectedImage(event.target.files[0])}
//         />
//       </p>

//       <div className="form-actions">{children}</div>
//     </form>
//   );
// }

////////////////////////////////////////////////////////////////////////////

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function BranchForm({ onSubmit, inputData, children }) {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();

//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     if (selectedImage) {
//       formData.append("image", selectedImage);
//     }
//     onSubmit(formData); // Pass FormData to the onSubmit function
//   }

//   return (
//     <form id="branch-form" onSubmit={handleSubmit}>
//       <p className="control">
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           required
//           defaultValue={inputData?.branchno ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="street">Street</label>
//         <input
//           type="text"
//           id="street"
//           name="street"
//           required
//           defaultValue={inputData?.street ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="city">City</label>
//         <input
//           type="text"
//           id="city"
//           name="city"
//           required
//           defaultValue={inputData?.city ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="postcode">Postcode</label>
//         <input
//           type="text"
//           id="postcode"
//           name="postcode"
//           required
//           defaultValue={inputData?.postcode ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="image">Image</label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={(event) => setSelectedImage(event.target.files[0])}
//         />
//       </p>

//       <div className="form-actions">{children}</div>
//     </form>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////
//import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function BranchForm({ onSubmit, inputData, children }) {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();

//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     if (selectedImage) {
//       formData.append("image", selectedImage);
//     }
//     onSubmit(formData);
//   }

//   function handleImageChange(event) {
//     setSelectedImage(event.target.files[0]);
//   }

//   return (
//     <form
//       id="branch-form"
//       onSubmit={handleSubmit}
//       encType="multipart/form-data"
//     >
//       <p className="control">
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           required
//           defaultValue={inputData?.branchno ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="street">Street</label>
//         <input
//           type="text"
//           id="street"
//           name="street"
//           required
//           defaultValue={inputData?.street ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="city">City</label>
//         <input
//           type="text"
//           id="city"
//           name="city"
//           required
//           defaultValue={inputData?.city ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="postcode">Postcode</label>
//         <input
//           type="text"
//           id="postcode"
//           name="postcode"
//           required
//           defaultValue={inputData?.postcode ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="image">Image</label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//         {selectedImage && (
//           <img
//             src={URL.createObjectURL(selectedImage)}
//             alt="Preview"
//             className="image-preview"
//           />
//         )}
//       </p>

//       <div className="form-actions">{children}</div>
//     </form>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////
//////////////////  MULTIPARTY ////////////////////////////////////////////////
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function BranchForm({ onSubmit, inputData, children }) {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();

//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     if (selectedImage) {
//       formData.append("image", selectedImage);
//     }
//     onSubmit(formData);
//   }

//   function handleImageChange(event) {
//     const file = event.target.files[0];
//     if (file && file.size > 10 * 1024 * 1024) {
//       // 10MB max file size
//       alert("File size exceeds 10MB");
//       return;
//     }
//     setSelectedImage(file);
//   }

//   return (
//     <form
//       id="branch-form"
//       onSubmit={handleSubmit}
//       encType="multipart/form-data"
//     >
//       <p className="control">
//         <label htmlFor="branchno">Branch Number</label>
//         <input
//           type="text"
//           id="branchno"
//           name="branchno"
//           required
//           defaultValue={inputData?.branchno ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="street">Street</label>
//         <input
//           type="text"
//           id="street"
//           name="street"
//           required
//           defaultValue={inputData?.street ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="city">City</label>
//         <input
//           type="text"
//           id="city"
//           name="city"
//           required
//           defaultValue={inputData?.city ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="postcode">Postcode</label>
//         <input
//           type="text"
//           id="postcode"
//           name="postcode"
//           required
//           defaultValue={inputData?.postcode ?? ""}
//         />
//       </p>

//       <p className="control">
//         <label htmlFor="image">Image</label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//         {selectedImage && (
//           <img
//             src={URL.createObjectURL(selectedImage)}
//             alt="Preview"
//             className="image-preview"
//           />
//         )}
//       </p>

//       <div className="form-actions">{children}</div>
//     </form>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BranchForm({ onSubmit, inputData, children }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await onSubmit(formData);
      navigate("/branches"); // Adjust the route as needed
    } catch (error) {
      console.error("Submission error:", error);
      // Optionally handle errors here
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      // 10MB max file size
      alert("File size exceeds 10MB");
      return;
    }
    setSelectedImage(file);
  }

  return (
    <form
      id="branch-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <p className="control">
        <label htmlFor="branchno">Branch Number</label>
        <input
          type="text"
          id="branchno"
          name="branchno"
          required
          defaultValue={inputData?.branchno ?? ""}
        />
      </p>

      <p className="control">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          required
          defaultValue={inputData?.street ?? ""}
        />
      </p>

      <p className="control">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          required
          defaultValue={inputData?.city ?? ""}
        />
      </p>

      <p className="control">
        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          required
          defaultValue={inputData?.postcode ?? ""}
        />
      </p>

      <p className="control">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="image-preview"
          />
        )}
      </p>

      <div className="form-actions">{children}</div>
    </form>
  );
}
