<?php

namespace App\Mail\DHQAdmin;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ProdAdminResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $resetUrl,
        public string $name,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Your DeskHQ Password',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.prod-admin.reset-password',
        );
    }
}
