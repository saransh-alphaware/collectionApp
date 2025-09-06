############################################
# React Native / Hermes (common baseline)
############################################
# Keep RN & Hermes classes/methods
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.hermes.**
-dontwarn com.facebook.react.**

# Keep TurboModule / Fabric classes if on New Architecture
-keep class com.facebook.react.turbomodule.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.fabric.** { *; }
-dontwarn com.facebook.react.turbomodule.**
-dontwarn com.facebook.react.fabric.**

# If you use JS ↔ native reflection, keep ReactPackage & NativeModule names
-keep class * implements com.facebook.react.bridge.NativeModule { *; }
-keep class * implements com.facebook.react.ReactPackage { *; }

############################################
# Popular RN libraries (enable as needed)
############################################

# Reanimated (v2+)
-keep class com.swmansion.reanimated.** { *; }
-dontwarn com.swmansion.reanimated.**

# Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }
-dontwarn com.swmansion.gesturehandler.**

# Navigation (react-native-screens)
-keep class com.swmansion.rnscreens.** { *; }
-dontwarn com.swmansion.rnscreens.**

# Vector Icons (if used)
-keep class com.oblador.vectoricons.** { *; }
-dontwarn com.oblador.vectoricons.**

############################################
# Networking / JSON (if used)
############################################
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**
-keep class okio.** { *; }
-dontwarn okio.**
-keep class retrofit2.** { *; }
-dontwarn retrofit2.**
-keep class com.google.gson.** { *; }
-keepattributes Signature
-keepattributes *Annotation*

############################################
# Image loading (Glide or Fresco)
############################################
# Glide
-keep class com.bumptech.glide.** { *; }
-dontwarn com.bumptech.glide.**

# Fresco (used by RN by default)
-keep class com.facebook.imagepipeline.** { *; }
-dontwarn com.facebook.imagepipeline.**

############################################
# AndroidX / Kotlin / Coroutines / WorkManager
############################################
-dontwarn androidx.**
-dontwarn kotlin.**
-dontwarn kotlinx.coroutines.**
-keep class kotlinx.coroutines.** { *; }

# WorkManager (if used)
-keep class androidx.work.** { *; }
-keepclassmembers class * extends androidx.work.ListenableWorker {
  <init>(android.content.Context, androidx.work.WorkerParameters);
}

############################################
# Firebase (enable blocks you use)
############################################
# Core / Analytics / Messaging / Crashlytics
-dontwarn com.google.firebase.**
-keep class com.google.firebase.** { *; }

# Crashlytics model keeps
-keep class com.crashlytics.** { *; }
-keepattributes SourceFile,LineNumberTable

############################################
# App Links / FileProvider authorities (avoid stripping)
############################################
-keepclassmembers class ** {
  @androidx.annotation.Keep *;
}

# If you use ContentProviders based on applicationId
-keep public class * extends android.content.ContentProvider

############################################
# Keep your app's Application & Activities
############################################
-keep class com.dmscollectionapp.** { *; }   # <-- match your package
