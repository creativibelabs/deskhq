<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your DeskHQ Password</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F4F6FB;
            color: #1A1A2E;
            padding: 40px 20px;
        }
        .wrapper {
            max-width: 560px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 32px;
        }
        .logo {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
        }
        .logo-icon {
            width: 40px;
            height: 40px;
            background: #4B7FE3;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .logo-text {
            font-size: 22px;
            font-weight: 700;
            color: #1A1A2E;
            letter-spacing: -0.5px;
        }
        .logo-text span {
            color: #4B7FE3;
        }
        .card {
            background: #FFFFFF;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 2px 12px rgba(75, 127, 227, 0.08);
        }
        .icon-wrap {
            width: 64px;
            height: 64px;
            background: #EEF3FF;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
        }
        .icon-wrap svg {
            width: 32px;
            height: 32px;
            stroke: #4B7FE3;
        }
        h1 {
            font-size: 22px;
            font-weight: 700;
            color: #1A1A2E;
            margin-bottom: 12px;
            letter-spacing: -0.3px;
        }
        .greeting {
            font-size: 15px;
            color: #4A5568;
            margin-bottom: 8px;
        }
        .description {
            font-size: 15px;
            color: #4A5568;
            line-height: 1.6;
            margin-bottom: 32px;
        }
        .btn {
            display: inline-block;
            background: #4B7FE3;
            color: #FFFFFF !important;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 0.2px;
            margin-bottom: 32px;
            transition: background 0.2s;
        }
        .divider {
            height: 1px;
            background: #EEF3FF;
            margin-bottom: 24px;
        }
        .expiry {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #EEF3FF;
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 24px;
        }
        .expiry svg {
            width: 18px;
            height: 18px;
            stroke: #4B7FE3;
            flex-shrink: 0;
        }
        .expiry p {
            font-size: 13px;
            color: #4B7FE3;
            font-weight: 500;
        }
        .url-box {
            background: #F4F6FB;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 24px;
            word-break: break-all;
        }
        .url-box p {
            font-size: 12px;
            color: #718096;
            margin-bottom: 4px;
        }
        .url-box a {
            font-size: 12px;
            color: #4B7FE3;
            word-break: break-all;
        }
        .ignore {
            font-size: 13px;
            color: #718096;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            margin-top: 32px;
        }
        .footer p {
            font-size: 13px;
            color: #A0AEC0;
            line-height: 1.6;
        }
        .footer a {
            color: #4B7FE3;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="wrapper">

        <div class="header">
            <div class="logo">
                <div class="logo-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <path d="M8 21h8M12 17v4"/>
                    </svg>
                </div>
                <span class="logo-text">Desk<span>HQ</span></span>
            </div>
        </div>

        <div class="card">

            <div class="icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
            </div>

            <h1>Reset Your Password</h1>
            <p class="greeting">Hi {{ $name }},</p>
            <p class="description">
                We received a request to reset the password for your DeskHQ account.
                Click the button below to choose a new password.
            </p>

            <a href="{{ $resetUrl }}" class="btn">
                Reset Password
            </a>

            <div class="divider"></div>

            <div class="expiry">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
                <p>This link will expire in 60 minutes.</p>
            </div>

            <div class="url-box">
                <p>If the button doesn't work, copy this link:</p>
                <a href="{{ $resetUrl }}">{{ $resetUrl }}</a>
            </div>

            <p class="ignore">
                If you didn't request a password reset, you can safely ignore this email.
                Your password will remain unchanged.
            </p>

        </div>

        <div class="footer">
            <p>
                &copy; {{ date('Y') }} CreatiVibe Labs. All rights reserved.<br>
                <a href="#">Privacy Policy</a> &nbsp;&middot;&nbsp; <a href="#">Terms of Service</a>
            </p>
        </div>

    </div>
</body>
</html>
