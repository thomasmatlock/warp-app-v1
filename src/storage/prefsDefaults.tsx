const prefs = {
  audio: {
    dropdowns: [
      {
        title: 'Audio Quality',
        id: 'audioQuality',
        defaultValue: {
          id: 'audioQuality_high',
          value: 'audioQuality_high',
          label: 'High quality (320kbps)',
        },
        options: [
          {
            id: 'audioQuality_best',
            value: 'audioQuality_best',
            label: 'Best Available (default)',
          },
          {
            id: 'audioQuality_high',
            value: 'audioQuality_high',
            label: 'High quality (320kbps)',
          },
          {
            id: 'audioQuality_medium',
            value: 'audioQuality_medium',
            label: 'Medium quality (256kbps)',
          },
          {
            id: 'audioQuality_low',
            value: 'audioQuality_low',
            label: 'Low quality (128kbps)',
          },
        ],
      },
      {
        title: 'Audio Format',
        id: 'audioFormat',
        defaultValue: {
          id: 'audioFormat_M4A',
          value: 'audioFormat_M4A',
          label: 'M4A',
        },
        options: [
          {
            id: 'audioFormat_MP3',
            value: 'audioFormat_MP3',
            label: 'MP3 (default)',
          },
          {
            id: 'audioFormat_M4A',
            value: 'audioFormat_M4A',
            label: 'M4A',
          },
          {
            id: 'audioFormat_WAV',
            value: 'audioFormat_WAV',
            label: 'WAV',
          },
          {
            id: 'audioFormat_OGG',
            value: 'audioFormat_OGG',
            label: 'OGG',
          },
        ],
      },
    ],
    folders: [
      {
        title: 'Audio Downloads Folder',
        id: 'modalPrefsOutputFolder_audio',
        placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Audio',
      },
    ],
  },
  video: {
    dropdowns: [
      {
        title: 'Video Quality',
        id: 'modalDropdown_videoQuality',
        defaultValue: {
          id: 'modalDropdown_videoQuality_best',
          value: 'videoQuality_best',
          label: 'Best Available (default)',
        },
        options: [
          {
            id: 'modalDropdown_videoQuality_best',
            value: 'videoQuality_best',
            label: 'Best Available (default)',
          },
          {
            id: 'modalDropdown_videoQuality_8k_60fps',
            value: 'videoQuality_8k_60fps',
            label: '8k 60fps',
          },

          {
            id: 'modalDropdown_videoQuality_8k',
            value: 'videoQuality_8k',
            label: '8k',
          },
          {
            id: 'modalDropdown_videoQuality_4k_60fps',
            value: 'videoQuality_4k_60fps',
            label: '4k 60fps',
          },
          {
            id: 'modalDropdown_videoQuality_4k',
            value: 'videoQuality_4k',
            label: '4k',
          },
          {
            id: 'modalDropdown_videoQuality_1080p_60fps',
            value: 'videoQuality_1080p_60fps',
            label: '1080p 60fps',
          },
          {
            id: 'modalDropdown_videoQuality_1080p',
            value: 'videoQuality_1080p',
            label: '1080p',
          },
          {
            id: 'modalDropdown_videoQuality_720p_60fps',
            value: 'videoQuality_720p_60fps',
            label: '720p 60fps',
          },
          {
            id: 'modalDropdown_videoQuality_720p',
            value: 'videoQuality_720p',
            label: '720p',
          },
          {
            id: 'modalDropdown_videoQuality_480p',
            value: 'videoQuality_480p',
            label: '480p',
          },
          {
            id: 'modalDropdown_videoQuality_360p',
            value: 'videoQuality_360p',
            label: '360p',
          },
          {
            id: 'modalDropdown_videoQuality_240p',
            value: 'videoQuality_240p',
            label: '240p',
          },
        ],
      },
      {
        title: 'Video Format',
        id: 'modalDropdown_videoFormat',
        defaultValue: {
          id: 'modalDropdown_videoFormat_MP4',
          value: 'videoFormat_MP4',
          label: 'MP4 (default)',
        },
        options: [
          {
            id: 'modalDropdown_videoFormat_MP4',
            value: 'videoFormat_MP4',
            label: 'MP4 (default)',
          },
          {
            id: 'modalDropdown_videoFormat_MKV',
            value: 'videoFormat_MKV',
            label: 'MKV',
          },

          {
            id: 'modalDropdown_videoFormat_MOV',
            value: 'videoFormat_MOV',
            label: 'MOV',
          },
        ],
      },
    ],
    folders: [
      {
        title: 'Video Downloads Folder',
        id: 'modalPrefsOutputFolder_video',
        placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Video',
      },
    ],
  },
  warpstagram: {
    dropdowns: [
      {
        title: 'Auto update',
        id: 'modalDropdown_warpstagram_updateSelected',
        options: [
          {
            id: 'modalDropdown_warpstagram_updateSelected_all',
            value: 'warpstagram_updateSelected_all',
            label: 'Update All (default)',
          },
          {
            id: 'modalDropdown_warpstagram_updateSelected_pinned',
            value: 'warpstagram_updateSelected_pinned',
            label: 'Update Pinned',
          },
          {
            id: 'modalDropdown_warpstagram_updateSelected_disabled',
            value: 'warpstagram_updateSelected_disabled',
            label: 'Disabled',
          },
        ],
      },
      {
        title: 'Post sorting',
        id: 'modalDropdown_warpstagram_postSorting',
        options: [
          {
            id: 'modalDropdown_warpstagram_postSorting_new_to_old',
            value: 'warpstagram_postSorting_new_to_old',
            label: 'Newest to oldest (default)',
          },
          {
            id: 'modalDropdown_warpstagram_postSorting_old_to_new',
            value: 'warpstagram_postSorting_old_to_new',
            label: 'Oldest to newest',
          },
          {
            id: 'modalDropdown_warpstagram_postSorting_AZ',
            value: 'warpstagram_postSorting_AZ',
            label: 'A to Z',
          },
          {
            id: 'modalDropdown_warpstagram_postSorting_ZA',
            value: 'warpstagram_postSorting_ZA',
            label: 'Z to A',
          },
        ],
      },
      {
        title: 'Auto update frequency',
        id: 'modalDropdown_warpstagram_autoUpdateFrequency',
        options: [
          {
            id: 'modalDropdown_warpstagram_autoUpdateFrequency_24',
            value: 'warpstagram_autoUpdateFrequency_24',
            label: 'Daily (default)',
          },
          {
            id: 'modalDropdown_warpstagram_autoUpdateFrequency_12',
            value: 'warpstagram_autoUpdateFrequency_12',
            label: '12 hours',
          },
          {
            id: 'modalDropdown_warpstagram_autoUpdateFrequency_6',
            value: 'warpstagram_autoUpdateFrequency_6',
            label: '6 hours',
          },
        ],
      },
    ],
    folders: [
      {
        title: 'Warpstagram Downloads Folder',
        id: 'modalPrefsOutputFolder_warpstagram',
        placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Warpstagram',
      },
    ],
  },
  general: {
    checkboxes: [
      {
        title: 'Automatically start Warp on system start',
        id: 'autostartWarpOnSystemStart',
      },
      {
        title: 'Warp will minimize to your system tray when you close it',
        id: 'minimizeToTrayOnClose',
      },
    ],
    dropdowns: [
      {
        title: 'Startup mode on launch',
        id: 'modalDropdown_general_startupTab',
        options: [
          {
            id: 'modalDropdown_general_startupTab_recent',
            value: 'general_startupTab_recent',
            label: 'Most recently used (default)',
          },
          {
            id: 'modalDropdown_general_startupTab_audio',
            value: 'general_startupTab_audio',
            label: 'Audio',
          },
          {
            id: 'modalDropdown_general_startupTab_video',
            value: 'general_startupTab_video',
            label: 'Video',
          },
          {
            id: 'modalDropdown_general_startupTab_warpstagram',
            value: 'general_startupTab_warpstagram',
            label: 'Warpstagram',
          },
        ],
      },
      {
        title: 'Browser source on startup',
        id: 'modalDropdown_general_startupSource',
        options: [
          {
            id: 'modalDropdown_general_startupSource_recent',
            value: 'general_startupSource_recent',
            label: 'Most recently used source (default)',
          },
          {
            id: 'modalDropdown_general_startupSource_facebook',
            value: 'general_startupSource_facebook',
            label: 'Facebook',
          },
          {
            id: 'modalDropdown_general_startupSource_pinterest',
            value: 'general_startupSource_pinterest',
            label: 'Pinterest',
          },
          {
            id: 'modalDropdown_general_startupSource_soundcloud',
            value: 'general_startupSource_soundcloud',
            label: 'Soundcloud',
          },
          {
            id: 'modalDropdown_general_startupSource_twitter',
            value: 'general_startupSource_twitter',
            label: 'Twitter',
          },
          {
            id: 'modalDropdown_general_startupSource_tiktok',
            value: 'general_startupSource_tiktok',
            label: 'Tiktok',
          },
          {
            id: 'modalDropdown_general_startupSource_youtube',
            value: 'general_startupSource_youtube',
            label: 'Youtube',
          },
        ],
      },
    ],
  },
};
export default prefs;
