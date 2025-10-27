package xyz.kboapp

import android.content.pm.PackageManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class InstagramModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    override fun getName(): String {
        return "InstagramModule"
    }

    @ReactMethod
    fun isInstagramInstalled(promise: Promise) {
        try {
            val packageManager = reactApplicationContext.packageManager
            val instagramPackageName = "com.instagram.android"
            
            // Instagram 앱이 설치되어 있는지 확인
            try {
                packageManager.getPackageInfo(instagramPackageName, PackageManager.GET_ACTIVITIES)
                promise.resolve(true)
            } catch (e: PackageManager.NameNotFoundException) {
                promise.resolve(false)
            }
        } catch (e: Exception) {
            promise.reject("ERROR", "Instagram 설치 확인 중 오류 발생", e)
        }
    }
}

