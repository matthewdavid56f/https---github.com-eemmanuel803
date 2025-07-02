# Firebase Studio

This is a NextJS starter in Firebase Studio.

## How to Run This App on Your Computer (Windows)

You're so close to getting this running! Follow these exact steps.

### Step 1: Find the Correct Project Folder

The `.zip` file you downloaded has folders inside of folders. We need to get to the real project folder.

1.  Open your **Downloads** folder.
2.  You will see a folder named `studio-master`. **Double-click to open it.**
3.  Inside, you will see **another** folder also named `studio-master`. This is the one we want! **Double-click to open this second folder.**

You are in the correct place if you now see a list of files and folders, including `package.json`, `next.config.ts`, and `src`.

### Step 2: Open a Terminal in the Right Place

1.  At the top of the File Explorer window, there is an address bar showing the folder path. **Click on the empty space in that bar.**
2.  All the text in the bar will turn blue. Delete everything in the bar, and type `powershell` right there, then press **Enter**.
3.  A new blue or black terminal window will pop up. It is now open in exactly the right folder.

### Step 3: Run the App

Now, in that new terminal window, type the following two commands, pressing Enter after each one.

1.  First, install all the necessary code libraries. This command fixes potential version conflicts.
    ```bash
    npm install --legacy-peer-deps
    ```
    (This might take a minute or two to finish.)

2.  Finally, start the application:
    ```bash
    npm run dev
    ```

After the last command, the terminal will give you a link like **http://localhost:9002**. Click on it or copy it into your browser to see your app running live!

---

## How to Run on Android (Termux - Advanced)

Running a full web development environment on a phone is complex. Follow these steps exactly to avoid file permission errors.

### Step 1: Prepare Termux

Open Termux and run these commands to install the tools you need. Press Enter after each one.

1.  Update Termux's packages and install tools:
    ```bash
    pkg update && pkg upgrade -y && pkg install nodejs unzip -y
    ```
2.  Allow Termux to access your phone's storage:
    ```bash
    termux-setup-storage
    ```
    (A popup will ask for permission on your phone. You must allow it.)

### Step 2: Move Project to a Safe Location

This is the most important part. We must move the project out of the shared Downloads folder and into Termux's private home directory.

1.  Go to your Downloads directory:
    ```bash
    cd ~/storage/downloads
    ```
2.  Unzip the project file. (Change the filename if yours is different).
    ```bash
    unzip "studio-master.zip"
    ```
3.  **Move the project folder** into your Termux home directory and rename it to `my-app`:
    ```bash
    mv studio-master/studio-master ~/my-app
    ```
    *Note: If you downloaded the project from GitHub, the folder name might be different, for example `guad-eyes-app-main`. Adjust the command accordingly.*

### Step 3: Install and Run the App

1.  Now, go into the new project folder you just moved:
    ```bash
    cd ~/my-app
    ```
2.  Install all the code libraries. This command will now work correctly:
    ```bash
    npm install --legacy-peer-deps
    ```
    (This might take a long time on a phone. Be patient.)
3.  Finally, start the application:
    ```bash
    npm run dev
    ```

If everything works, Termux will show a link like **http://localhost:9002**. You can open this in the web browser on your phone to see the app.

---
## Troubleshooting (Termux)

If `npm install` fails with an `EACCES` or `ENOTEMPTY` error, or `npm run dev` fails with `next: not found`, it means the installation is broken or you ran it from the wrong directory. To fix it, run this single command from inside your project directory (`~/my-app`):

```bash
npm run reinstall
```

This will automatically clean up the broken files and try the installation again. After it finishes, you can start the app with `npm run dev`.
