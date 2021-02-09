# development now

-   modals
    -   make modalEULAwindow
    -   Add settings modal, either separate frameless window, or like in that electron project
-   make active tab
    -   read state
    -   activate active tab (audio, video, warpstagram)
-   Make Warpstagram section, identical to 4k stogram, working on it, then refactor
-   Add a side by side iframe on left, right is downloads, and have electron know when navigates to new iframe page.

## startup checks

### startup checks added

-   isDevMode
-   acceptedEULA
-   isOnline
-   isLatestVersion
-   hasFFmpeg
-   server auth
-   isUpgradedUser
-   readLocalFiles
-   updateStateLocalFiles
-   updateUILocalFiles

### startup checks implemented and working

# development polish

-   Figure out how to have Warp talk to the server
-   Add the media queries etc guides
-   Look up the electron web dev mode

# production

-   make pro version, then gimp it artificially

# postfire

-   devmode turn off postfire
-   Postfire, split horizontally. Left: sources top, downloaded files bottom; right: queue, top to bottom, post maker top, queued posts bottom, bottom most post being next in line for publishing
