import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD5hObsic48VyrXcpZUDqppwt-ysOT6mZM",
  authDomain: "ak-coder-chatbot-007.firebaseapp.com",
  projectId: "ak-coder-chatbot-007",
  storageBucket: "ak-coder-chatbot-007.firebasestorage.app",
  messagingSenderId: "486799074238",
  appId: "1:486799074238:web:c856c0d27745a5391acfef",
};

// ✅ Initialize Firebase app (ek hi baar)
export const app = initializeApp(firebaseConfig);

// ✅ Auth instance export
export const auth = getAuth(app);
