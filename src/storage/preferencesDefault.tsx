const prefs = {
  audio: {
    dropdowns: [
      {
        title: 'Audio Quality',
        selectID: 'audioQuality',
        options: [
          {
            enabled: true,
            id: 'audioQuality_best',
            value: 'audioQuality_best',
            label: 'Best Available (default)',
          },
          {
            enabled: true,
            id: 'audioQuality_high',
            value: 'audioQuality_high',
            label: 'High quality (320kbps)',
          },
          {
            enabled: true,
            id: 'audioQuality_medium',
            value: 'audioQuality_medium',
            label: 'Medium quality (256kbps)',
          },
          {
            enabled: true,
            id: 'audioQuality_low',
            value: 'audioQuality_low',
            label: 'Low quality (128kbps)',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
        ],
      },
      {
        title: 'Audio Format',
        selectID: 'audioFormat',
        options: [
          {
            enabled: true,
            id: 'audioFormat_MP3',
            value: 'audioFormat_MP3',
            label: 'MP3 (default)',
          },
          {
            enabled: true,
            id: 'audioFormat_M4A',
            value: 'audioFormat_M4A',
            label: 'M4A',
          },
          {
            enabled: true,
            id: 'audioFormat_WAV',
            value: 'audioFormat_WAV',
            label: 'WAV',
          },
          {
            enabled: true,
            id: 'audioFormat_OGG',
            value: 'audioFormat_OGG',
            label: 'OGG',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
        ],
      },
    ],
  },
  video: {
    dropdowns: [
      {
        title: 'Video Quality',
        selectID: 'modalDropdown_videoQuality',
        options: [
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_best',
            value: 'videoQuality_best',
            label: 'Best Available (default)',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_8k_60fps',
            value: 'videoQuality_8k_60fps',
            label: '8k 60fps',
          },

          {
            enabled: true,
            id: 'modalDropdown_videoQuality_8k',
            value: 'videoQuality_8k',
            label: '8k',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_4k_60fps',
            value: 'videoQuality_4k_60fps',
            label: '4k 60fps',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_4k',
            value: 'videoQuality_4k',
            label: '4k',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_1080p_60fps',
            value: 'videoQuality_1080p_60fps',
            label: '1080p 60fps',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_1080p',
            value: 'videoQuality_1080p',
            label: '1080p',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_720p_60fps',
            value: 'videoQuality_720p_60fps',
            label: '720p 60fps',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_720p',
            value: 'videoQuality_720p',
            label: '720p',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_480p',
            value: 'videoQuality_480p',
            label: '480p',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_360p',
            value: 'videoQuality_360p',
            label: '360p',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoQuality_240p',
            value: 'videoQuality_240p',
            label: '240p',
          },
        ],
      },
      {
        title: 'Video Format',
        selectID: 'modalDropdown_videoFormat',
        options: [
          {
            enabled: true,
            id: 'modalDropdown_videoFormat_MP4',
            value: 'videoFormat_MP4',
            label: 'MP4 (default)',
          },
          {
            enabled: true,
            id: 'modalDropdown_videoFormat_MKV',
            value: 'videoFormat_MKV',
            label: 'MKV',
          },

          {
            enabled: true,
            id: 'modalDropdown_videoFormat_MOV',
            value: 'videoFormat_MOV',
            label: 'MOV',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
        ],
      },
    ],
  },
  warpstagram: {
    dropdowns: [
      {
        title: 'Auto update',
        selectID: 'modalDropdown_warpstagram_updateSelected',
        options: [
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_updateSelected_all',
            value: 'warpstagram_updateSelected_all',
            label: 'Update All (default)',
          },
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_updateSelected_pinned',
            value: 'warpstagram_updateSelected_pinned',
            label: 'Update Pinned',
          },
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_updateSelected_disabled',
            value: 'warpstagram_updateSelected_disabled',
            label: 'Disabled',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
        ],
      },
      {
        title: 'Post sorting',
        selectID: 'modalDropdown_warpstagram_postSorting',
        options: [
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_postSorting_new_to_old',
            value: 'warpstagram_postSorting_new_to_old',
            label: 'Newest to oldest (default)',
          },
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_postSorting_old_to_new',
            value: 'warpstagram_postSorting_old_to_new',
            label: 'Oldest to newest',
          },
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_postSorting_AZ',
            value: 'warpstagram_postSorting_AZ',
            label: 'A to Z',
          },
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_postSorting_ZA',
            value: 'warpstagram_postSorting_ZA',
            label: 'Z to A',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
        ],
      },
      {
        title: 'Auto update frequency',
        selectID: 'modalDropdown_warpstagram_autoUpdateFrequency',
        options: [
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_autoUpdateFrequency_24',
            value: 'warpstagram_autoUpdateFrequency_24',
            label: 'Daily (default)',
          },
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_autoUpdateFrequency_12',
            value: 'warpstagram_autoUpdateFrequency_12',
            label: '12 hours',
          },
          {
            enabled: true,
            id: 'modalDropdown_warpstagram_autoUpdateFrequency_6',
            value: 'warpstagram_autoUpdateFrequency_6',
            label: '6 hours',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
        ],
      },
    ],
  },
  general: {
    checkboxes: [
      {
        title: 'Automatically start Warp on system start',
        id: 'autostartWarpOnSystemStart',
        active: false,
      },
      {
        title: 'Warp will minimize to your system tray when you close it',
        id: 'minimizeToTrayOnClose',
        active: false,
      },
    ],
    dropdowns: [
      {
        title: 'Startup mode on launch',
        selectID: 'modalDropdown_general_startupTab',
        options: [
          {
            enabled: true,
            id: 'modalDropdown_general_startupTab_recent',
            value: 'general_startupTab_recent',
            label: 'Most recently used (default)',
          },
          {
            enabled: true,
            id: 'modalDropdown_general_startupTab_audio',
            value: 'general_startupTab_audio',
            label: 'Audio',
          },
          {
            enabled: true,
            id: 'modalDropdown_general_startupTab_video',
            value: 'general_startupTab_video',
            label: 'Video',
          },
          {
            enabled: true,
            id: 'modalDropdown_general_startupTab_warpstagram',
            value: 'general_startupTab_warpstagram',
            label: 'Warpstagram',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
        ],
      },
      {
        title: 'Browser source on startup',
        selectID: 'modalDropdown_general_startupSource',
        options: [
          {
            enabled: true,
            id: 'modalDropdown_general_startupSource_recent',
            value: 'general_startupSource_recent',
            label: 'Most recently used source (default)',
          },
          {
            enabled: true,
            id: 'modalDropdown_general_startupSource_facebook',
            value: 'general_startupSource_facebook',
            label: 'Facebook',
          },
          {
            enabled: true,
            id: 'modalDropdown_general_startupSource_pinterest',
            value: 'general_startupSource_pinterest',
            label: 'Pinterest',
          },
          {
            enabled: true,
            id: 'modalDropdown_general_startupSource_soundcloud',
            value: 'general_startupSource_soundcloud',
            label: 'Soundcloud',
          },
          {
            enabled: true,
            id: 'modalDropdown_general_startupSource_twitter',
            value: 'general_startupSource_twitter',
            label: 'Twitter',
          },
          {
            enabled: true,
            id: 'modalDropdown_general_startupSource_tiktok',
            value: 'general_startupSource_tiktok',
            label: 'Tiktok',
          },
          {
            enabled: true,
            id: 'modalDropdown_general_startupSource_youtube',
            value: 'general_startupSource_youtube',
            label: 'Youtube',
          },

          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
          {
            enabled: false,
            id: 'changeThis',
            value: 'changeThis',
            label: 'changeThis',
          },
        ],
      },
    ],
  },
};
export default prefs;
