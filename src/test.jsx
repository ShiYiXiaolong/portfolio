export default function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: 'purple', padding: '1rem', color: 'white' }}>
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> [Date]</p>
      <p>
        [App Name] (“the App”) is provided by [Company/Org Name] for business
        customers. We designed the App to avoid collecting personal data from
        end users.
      </p>

      <h2>Data We Collect</h2>
      <p>We do not collect personal data from users through the App.</p>
      <p>
        Authentication uses email and password credentials that are created
        separately on lotzapp.org (B2B access only).
      </p>

      <h2>How Data Is Used</h2>
      <p>
        Authentication: Credentials created on lotzapp.org are used solely to
        verify your access to the App.
      </p>

      <h2>Third-Party Services</h2>
      <p>None. We do not use third-party analytics, advertising, or tracking services.</p>

      <h2>Data Sharing</h2>
      <p>We do not sell, rent, or share user data with third parties.</p>

      <h2>Data Storage</h2>
      <p>
        Any data processed via our backend services is stored on our Hetzner
        server located in Austria.
      </p>

      <h2>Security</h2>
      <p>
        We implement reasonable technical and organizational measures to protect
        data in transit and at rest on our Hetzner infrastructure.
      </p>

      <h2>Children’s Privacy</h2>
      <p>The App is intended for business users only and is not directed to children.</p>

      <h2>Your Choices</h2>
      <p>
        If you have questions about access, correction, or deletion of
        credentials managed on lotzapp.org, please contact us.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. We will post the updated
        version in the App or on our website with a new effective date.
      </p>

      <h2>Contact</h2>
      <p>For any questions or requests, contact us at [Contact Email].</p>
    </div>
  );
}